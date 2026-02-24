export const selectRoleName = (state, roleId) => {
  return state.lookup.roles.find((r) => String(r.id) === String(roleId))?.name || "--";
};

export const selectBuildingName = (state, buildingId) => {
  return state.lookup.buildings.find((b) => String(b.id) === String(buildingId))?.name || "--";
};