import moment from 'moment';
// @ts-ignore
import { combineResolvers } from 'graphql-resolvers';
import { findAvailableTools } from '../tool';
import { generateFreeSlots, findAvailablePersonnel } from './helpers';

export default {
  Query: {
    getSlots: combineResolvers(
      // @ts-ignore
      async (_, { data: { start, end, specialities, equipment, speakingLanguages } }, { db, }) => {

        const dd = String(new Date(start).getDate()).padStart(2, '0');
        const mm = String(new Date(start).getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = new Date(start).getFullYear();

        const DAY_START_TIME = yyyy + '-' + mm + '-' + dd + 'T' + '08:00:00.000Z';
        const DAY_END_TIME = yyyy + '-' + mm + '-' + dd + 'T' + '23:00:00.000Z';
    
        const duration = moment.duration(moment(end).diff(start)).asMinutes();
        
        const availableEmployees =
          await findAvailablePersonnel(
            db,
            start,
            end,
            // @ts-ignore
            specialities.map((spec) => spec.speciality)
          );          
          
        // @ts-ignore
        const availableTools = await findAvailableTools(db, equipment.map((eq) => eq.toolType));

        const availableSlots = await generateFreeSlots({
          employees: availableEmployees,
          tools: availableTools,
          dayStartTime: DAY_START_TIME,
          end: DAY_END_TIME,
          duration,
          specialities,
          equipment,
          speakingLanguages,
        });

        return { availableSlots };
      }
    ),
  },
};
