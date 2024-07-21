import { currentUser } from '@clerk/nextjs/server';

export const useCurrentUserEmail = async () => {
  const user = await currentUser();
  return user?.email;
};