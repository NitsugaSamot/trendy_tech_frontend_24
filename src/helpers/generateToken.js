const generateToken = () => {
  const randomId = Math.random().toString(32).substring(2);
  const today = Date.now().toString(32);

  return randomId + today;
};

export default generateToken;
