import { TRoute, TUserPath } from "../types";

export const routesGenerator = (userPaths: TUserPath[]) => {
  const routes = userPaths.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
      acc.push({
        index: true,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  return routes;
};
