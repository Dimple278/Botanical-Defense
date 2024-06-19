export const isCollided = (obj1: { x: number, y: number, w: number, h: number }, obj2: { x: number, y: number, w: number, h: number }): boolean => {
  if (
      obj1.x > obj2.x + obj2.w ||
      obj1.x + obj1.w < obj2.x || 
      obj1.y + obj1.h < obj2.y || 
      obj1.y > obj2.y + obj2.h 
  ) {
      return false;
  } else {
      return true;
  }
};
