// @ts-ignore
export default (user) => {
  const {
    password, ...restUser
  } = user;
  return restUser;
};
