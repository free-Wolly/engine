import { PrismaClient, Speciality } from '@prisma/client';
import moment from 'moment';
// @ts-ignore
import availability from 'timeslot-availability';

const priorityConstant = require('../../utils/priorities')

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// @ts-ignore
export const findAvailablePersonnel = async (
  db: PrismaClient<{}, never>,
  // @ts-ignore
  fromDateTime,
  // @ts-ignore
  toDateTime,
  specialities: Speciality[],
) => {
  const start = moment(fromDateTime).utc();
  const end = moment(toDateTime).utc();
  
  const startDay = start.isoWeekday() - 1;
  //@TODO add zero to minutes!! is adding zero correct???
  const startTime = (start.hour() < 10 ? '0' : '') + start.hour() + ':' + (start.minute() < 10 ? '0' : '') + start.minute()
  
  const endDay = end.isoWeekday() - 1;
  const endTime = (end.hour() < 10 ? '0' : '') + end.hour() + ':' + (end.minute() < 10 ? '0' : '') + end.minute()  

  return await db.employee.findMany({
    where: {
      specialities: { hasSome: specialities },
      // TODO will this search work if we have Sunday->Monday shift?
      workingDaysAndHours: {
        some: {
          startWeekday: {
            lte: startDay,
          },
          endWeekday: {
            gte: endDay,
          },
          startTime: {
            lte: startTime,
          },
          endTime: {
            gte: endTime,
          },
        }
      },
    },

    include: { busyTimes: true, workingDaysAndHours: true },
  });
};

export const findAvailableTools = async (db: PrismaClient<{}, never>) => {
  // Find equipment that is available
  const tools = await db.tool.findMany({
    where: {
      isAvailable: {
        equals: true,
      },
    },
    include: { busyTimes: true },
  });
  return tools;
};

// @ts-ignore
const checkIfFullyFreeInRange = (from, end, duration, slots, timespan) => {
  let start = from;
  const to = moment(start).add(duration, 'm').toDate();
  while (!moment(start).isSame(to)) {
    // @ts-ignore
    const startSlot = slots.filter(s => moment(s.start).isSame(start));
    if (startSlot.length < 1) return false;
    start = moment(start).add(timespan, 'm').toDate();
  }
  return moment(to).isSameOrBefore(end);
};

// @ts-ignore
const dateDiffInDays = (a, b) => {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / MS_PER_DAY);
};

// @ts-ignore
const grabHoursAndMinutes = time => {
  const hour = time.substr(0, time.indexOf(':'));
  const minute = time.split(':')[1];

  return { hour, minute };
};

// @ts-ignore
const setTimeToDate = (date, time) => {
  const { hour, minute } = grabHoursAndMinutes(time);
  const updatedDate = new Date(date);
  updatedDate.setUTCHours(hour);
  updatedDate.setUTCMinutes(minute);

  return updatedDate;
};

// @ts-ignore
const calculateReccurentJobTime = (busyTime, startTime) => {
  const { contractStartDate, contractEndDate, daysInMonth, busyFrom, busyTo, startDayOfWeek, endDayOfWeek } = busyTime;

  const daysInWeek = 7;
  const interval = (daysInWeek * 4) / daysInMonth;
  const difference = dateDiffInDays(new Date(contractStartDate), startTime);
  const contractEndsBeforeSlot = dateDiffInDays(new Date(contractEndDate), startTime) > 0;

  if (difference % interval !== 0 || contractEndsBeforeSlot) {
    return false;
  }

  const busyFromDate = setTimeToDate(startTime, busyFrom);
  const busyToDate = setTimeToDate(startTime, busyTo);

  if (startDayOfWeek !== endDayOfWeek) {
    if (endDayOfWeek < startDayOfWeek) {
      // @TODO if job takes 3 or more days
      busyToDate.setUTCDate(busyToDate.getUTCDate() + (7 + endDayOfWeek - startDayOfWeek));
    } else {
      busyToDate.setUTCDate(busyToDate.getUTCDate() + (endDayOfWeek - startDayOfWeek));
    }
  }
  return { start: busyFromDate, end: busyToDate };
};

// @ts-ignore
const pickEquipment = props => {
  const { slots, equipment } = props;

  return (
    slots
      // @ts-ignore
      .map(slot => {
        // @ts-ignore
        let pickedEquipment = [];
        const checkedTools = Object.keys(slot.tools).map(k => ({
          count: slot.tools[k].ids.length,
          toolType: k,
          eIds: slot.tools[k].ids,
        }));

        if (checkedTools.length === 0) return false;
        // eslint-disable-next-line no-restricted-syntax
        for (const tool of equipment) {
          const targetTool = checkedTools.filter(t => t.toolType === tool.toolType)[0];
          if (!targetTool) return false;
          if (targetTool.count < tool.quantity) return false;
          const chosen = targetTool.eIds.slice(0, tool.quantity);
          // @ts-ignore
          pickedEquipment = [...pickedEquipment, ...chosen];
        }
        // @ts-ignore
        return { ...slot, pickedEquipment };
      })
      // @ts-ignore
      .filter(a => a)
  );
};

// @ts-ignore
const filterToolsByTypeAndAvailability = props => {
  const { slots, end, duration, tools, equipment, dayStartTime } = props;
  // @ts-ignore
  tools.forEach(tool => {
    // @ts-ignore
    const busy = (tool.busyTimes || []).map(({ busyFrom, busyTo }) => ({ start: busyFrom, end: busyTo }));
    let freeSlots = availability(dayStartTime, end, 30 * 60, busy);
    // @ts-ignore
    freeSlots = freeSlots.filter(slot => checkIfFullyFreeInRange(slot.start, end, duration, freeSlots, 30));
    // @ts-ignore
    freeSlots.forEach(slot => {
      // @ts-ignore
      const targetSlotIndex = slots.findIndex(s => moment(s.start).isSame(slot.start));
      if (targetSlotIndex === -1) return;
      const targetSlot = slots[targetSlotIndex];
      if (!targetSlot) return;
      const { toolType } = tool;
      // @ts-ignore
      const filteredToolType = equipment.filter(e => e.toolType === toolType).length === 0;
      if (filteredToolType) return;
      if (toolType in targetSlot.tools) {
        targetSlot.tools[toolType].ids = [tool.id, ...targetSlot.tools[toolType].ids];
      } else {
        targetSlot.tools[toolType] = { ids: [tool.id] };
      }
      slots.splice(targetSlotIndex, 1, targetSlot);
    });
  });
  return pickEquipment({ ...props, slots });
};

const pickTeamLead = (specs: any[], employees: { id: any; busyTimes: string | any[] }[] | undefined) => {
  // @ts-ignore
  const teamLeads: { id: string; spec: any }[] = [];
  // @ts-ignore
  const alreadyCheckedEmployee: string | any[] = [];

  const prioritySort = (item1: any, item2: any) => {

    const priorityOrderArray = priorityConstant.sort((a: any, b: any)=> b.priority - a.priority )

    //TODO NEED TO Change Logic here From static to dynamic
    if( item1.id == priorityOrderArray[0].spec) {
      return -1;
    } else if (item1.id == priorityOrderArray[1].spec) {
      return 1;
    } else {
      return 0;
    }

  }

  const sortedByPriority = specs.sort(prioritySort)

  sortedByPriority.map(spec => {
    // @ts-ignore
    spec.eIds.map((eid: any) => {
      if (alreadyCheckedEmployee.includes(eid)) return false;

      // @ts-ignore
      employees.filter((employee: { id: any; isTeamLead: any }) => {
        if (employee.id === eid && employee.isTeamLead) {
          const obj = { spec: spec.id, id: eid };
          // @ts-ignore
          teamLeads.push(obj);
        }
      });

      alreadyCheckedEmployee.push(eid);
    });
  });

  const lazyTeamLeadPicker = () => {
    let teamLeadsBusyTime = {};
    teamLeads.filter(async teamLead => {
      await Promise.all(
        // @ts-ignore
        employees.map((employee: { id: any; busyTimes: string | any[] }) => {
          if (employee.id === teamLead.id) {
            if(teamLeadsBusyTime[employee.busyTimes.length]) {
              teamLeadsBusyTime[employee.busyTimes.length].push({eid: teamLead.id, id: teamLead.spec})
            } else {
              teamLeadsBusyTime[employee.busyTimes.length] = [{eid: teamLead.id, id: teamLead.spec}]
            }
          }
        }),
      );
    });

    let teamLeadPicked = {};
    const ordered = Object.keys(teamLeadsBusyTime).sort().reduce(
      (obj, key) => {
        obj[key] = teamLeadsBusyTime[key];
        return obj;
      },
      {}
    );
    const firstElement = ordered[Object.keys(ordered)[0]]

    if(firstElement.length > 1) {
      const item = firstElement[Math.floor(Math.random()*firstElement.length)];
      teamLeadPicked = [{ id: item.eid, spec: item.id }];
    } else if(firstElement.length === 1) {
      const pickedTm = firstElement[0]
      teamLeadPicked = [{ id: pickedTm.eid, spec: pickedTm.id }];
    } else {
      return false
    }

    return teamLeadPicked;
  };

  if (teamLeads.length > 1) {
    return lazyTeamLeadPicker();
  } else {
    return teamLeads;
  }
};

const pickOtherEmployees = (
  dayStartTime: string,
  specs: { id: string; eIds: any }[],
  employees: any,
  requiredSpecAndTeamLead: any,
  pickedTeamLeadId: {},
) => {
  const newRequired: { speciality: any; count: number }[] = [];

  requiredSpecAndTeamLead.specialitiesObj.map((s: { speciality: any; count: number }) => {
    // @ts-ignore
    if (s.speciality === pickedTeamLeadId[0].spec) {
      newRequired.push({ speciality: s.speciality, count: s.count - 1 });
    } else {
      newRequired.push({ speciality: s.speciality, count: s.count });
    }
  });

  let picked = {};
  specs.map(spec => {
    // @ts-ignore
    spec.eIds.filter(async (eid: any) => {
      // @ts-ignore
      if (pickedTeamLeadId[0].id == eid) {
        return false;
      }

      await Promise.all(
        // @ts-ignore
        employees.map(employee => {
          if (employee.id == eid) {
            if (!picked[spec.id]) {
              picked[spec.id] = [];
            }

            let busyTimeLength = 0;
            let busyTimeHours = 0;

            employee.busyTimes.map((b: { busyFrom: any; busyTo: any }) => {
              const dd = String(b.busyFrom.getDate()).padStart(2, '0');
              const mm = String(b.busyFrom.getMonth() + 1).padStart(2, '0'); //January is 0!
              const yyyy = b.busyFrom.getFullYear();
              const testing = dayStartTime.split("T")
              const dateAgainst = yyyy + '-' + mm + '-' + dd + 'T';

              // time against we want to make order
              if (dateAgainst === `${testing}T`) {
                busyTimeLength++;
                busyTimeHours = busyTimeHours + (b.busyTo.getUTCHours() - b.busyFrom.getUTCHours());
              }
            });

            picked[spec.id].push({
              count: busyTimeLength,
              hours: busyTimeHours,
              id: eid,
              isTeamLead: employee.isTeamLead,
            });
          }
        }),
      );
    });
  });

  const pickedEmployees: any[] = [];
  // @ts-ignore
  let totalCount = 0;

  // @ts-ignore
  newRequired.map((req: any) => {
    if(!picked[req.speciality]) {
      return false
    }

    totalCount += req.count

    const specification: [] = picked[req.speciality]
    const compare = ( a: { hours: number; isTeamLead: boolean }, b: { hours: number; isTeamLead: boolean } ) => {
      if (a.isTeamLead === b.isTeamLead) {
        return a.hours - b.hours
      } else if(a.isTeamLead) {
        return 1;
      } else {
        return -1;
      }
    }
    const sortedEmployees: [] = specification.sort(compare)

    for (let i = 0; i < req.count; i++) {
      // @ts-ignore
      pickedEmployees.push(sortedEmployees[i].id)
    }

  });

  if (pickedEmployees.length < totalCount) {
    return false
  }

  return pickedEmployees
};

const findTeamLeadAndOtherEmployees = (dayStartTime: string, employees: any, slot: any, requiredSpecAndTeamLead: any) => {
  let pickedEmployeesIds: { id: string; eIds: any }[][] = [];
  const specs = Object.keys(slot.spec).map(k => ({ id: k, eIds: slot.spec[k].ids }));

  // @ts-ignore
  const pickedTeamLead = pickTeamLead(specs, employees);
  // @ts-ignore
  if (pickedTeamLead.length <= 0) {
    return false;
  } else {

    pickedEmployeesIds.push(pickedTeamLead[0].id);
    const chosenEmployees = pickOtherEmployees(dayStartTime, specs, employees, requiredSpecAndTeamLead, pickedTeamLead);
    // @ts-ignore
    pickedEmployeesIds = pickedEmployeesIds.concat(chosenEmployees);
  }

  const newObj = {};
  for (const [key, value] of Object.entries(slot.spec)) {
    // @ts-ignore
    value.ids.filter(v => {
      if (pickedEmployeesIds.includes(v)) {
        if (newObj[key]) {
          newObj[key].ids.push(v)
        } else {
          newObj[key] = { ids: [v] };
        }
      }
    });
  }
  slot.spec = newObj;

  return slot;
};

// @ts-ignore
const checkIfWeHaveEnoughResources = (
  requiredResources: { toolsObj: any; specialitiesObj: any; teamLead: number },
  specs: { count: any; id: string; eIds: any }[],
) => {
  const arrBool: boolean[] = [];
  const concatEids = specs.flatMap((t)=> {
    return t.eIds
  })
  let numberOfEmployees = 0;
  const uniqueEids = [...new Set(concatEids)]
  // @ts-ignore
  requiredResources.specialitiesObj.map(res => {
    const obj = specs.find(o => o.id === res.speciality);
    numberOfEmployees += res.count
    if (obj) {
      // @ts-ignore
      return arrBool.push(obj.count >= res.count);
    }
    arrBool.push(false);
  })

  if(uniqueEids.length < numberOfEmployees ) {
    arrBool.push(false)
  }

  return !arrBool.includes(false);
};

const pickNextEmployee = (props: any) => {
  const { employees, slots, specialities, dayStartTime, equipment } = props;  

  const specialitiesObj = specialities.map((spec: { speciality: string; quantity: number }) => ({
    speciality: spec.speciality,
    count: spec.quantity,
  }));

  const toolsObj = equipment.map((tool: { toolType: string; quantity: number; }) => ({
    tool: tool.toolType,
    count: tool.quantity
  }));

  return slots.filter((slot: { spec: { [x: string]: { ids: any; }; }; tools: {}; }) => {
    if (Object.keys(slot.spec).length === 0) return false;
    const requiredSpecAndTeamLead = {
      teamLead: 1,
      specialitiesObj,
      toolsObj
    };
    const specs = Object.keys(slot.spec).map(k => ({ count: slot.spec[k].ids.length, id: k, eIds: slot.spec[k].ids }));
    if (!checkIfWeHaveEnoughResources(requiredSpecAndTeamLead, specs)) return false;

    return findTeamLeadAndOtherEmployees(dayStartTime, employees, slot, requiredSpecAndTeamLead);
  });
};

// @ts-ignore
const pickEmployees = props => {
  const slotsWithEmployees = pickNextEmployee({ ...props });

  if (!props.tools?.length) {
    return slotsWithEmployees;
  }

  return filterToolsByTypeAndAvailability({ ...props, slots: slotsWithEmployees });
};

// @ts-ignore
const filterEmployeesByAvailabilityAndSpeciality = props => {
  const { employees, slots, dayStartTime, end, duration, specialities, tools, equipment } = props;

  if(equipment.length > 0 && tools.length <= 0) {
    return [];
  }
  // @ts-ignore
  employees.forEach(employee => {
    // @ts-ignore
    let busy: any[] = [];
    // @ts-ignore
    employee.busyTimes.forEach(busyTime => {
      if (busyTime.unavailableFrom && busyTime.unavailableTo) {
        // @ts-ignore
        busy = [...busy, { start: busyTime.unavailableFrom, end: busyTime.unavailableTo }];
      } 
    
      if (busyTime.contractStartDate) {
        const busyTimee = calculateReccurentJobTime(busyTime, dayStartTime);
        if (busyTimee) {
          // @ts-ignore
          busy = [...busy, busyTimee];
        }
      } 
      
      if (busyTime.busyFrom) {
        // @ts-ignore
        busy = [...busy, { start: busyTime.busyFrom, end: busyTime.busyTo }];
      }
    });

    
    // find availability slots based on start time, end time and busy times
    // @ts-ignore
    let freeSlots = availability(dayStartTime, end, 30 * 60, busy);
    // check if employee's start time and end time are covering the slot below
    // @ts-ignore
    freeSlots = freeSlots.filter(slot => checkIfFullyFreeInRange(slot.start, end, duration, freeSlots, 30));

    // @ts-ignore
    freeSlots.forEach(slot => {
      // @ts-ignore
      const targetSlotIndex = slots.findIndex(s => moment(s.start).isSame(slot.start));

      const targetSlot = slots[targetSlotIndex];

      const employeeSpecialityIds = employee.specialities;
      // @ts-ignore
      employeeSpecialityIds.forEach(sId => {
        // check if employee does not have required specialities
        // @ts-ignore
        const filteredSpecialities = specialities.filter(s => s.speciality === sId).length === 0;
        // if employee does not have required speciality just skip it
        if (filteredSpecialities) return;
        if (sId in targetSlot.spec) {
          targetSlot.spec[sId].ids = [employee.id, ...targetSlot.spec[sId].ids];
        } else {
          targetSlot.spec[sId] = { ids: [employee.id] };
        }
        slots.splice(targetSlotIndex, 1, targetSlot);
      });
    });
  });

  return pickEmployees({ ...props, slots });
};

// @ts-ignore
export const generateFreeSlots = props => {
  const { dayStartTime, end, duration } = props;
  // generate slots from 08:00 to 23:00
  const emptySlots = availability(dayStartTime, end, 30 * 60, []);
  // @ts-ignore
  const slots = emptySlots.map(s => ({ ...s, spec: {}, tools: {} }));
  
  // add duration 60 minutes as a delta time, reserving time for transportation
  const availableSlots = filterEmployeesByAvailabilityAndSpeciality({ ...props, slots, duration: duration + 60 });
  return availableSlots.map((slot: { spec: { [s: string]: unknown; } | ArrayLike<unknown>; start: string | number | Date; pickedEquipment: any; }) => {
    // @ts-ignore
    const employeeIds = Object.values(slot.spec).flatMap(({ids}) => ([...ids]))

    return {
      start: new Date(slot.start).toISOString(),
      employeeIds: employeeIds,
      toolIds: slot.pickedEquipment
    }
  })
};
