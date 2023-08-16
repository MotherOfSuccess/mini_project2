export const jwtFactory = {
  global: true,
  secret: `${process.env.ACCESS_SECRET_KEY}`,
  signOptions: { expiresIn: '60s' },
};
