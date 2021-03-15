export const ROUTE_TYPES = {
  public: "public",
  session: "session",
  private: "private",
};

export const isPrivate = (routeType) => routeType === ROUTE_TYPES.private;
export const isSession = (routeType) => routeType === ROUTE_TYPES.session;
export const isPublic = (routeType) => routeType === ROUTE_TYPES.public;
