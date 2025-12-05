export function buildRightDrawerItems(dashboards) {
  return Object.values(dashboards).map((d) => ({
    id: d.id,
    text: d.name,
  }));
}
