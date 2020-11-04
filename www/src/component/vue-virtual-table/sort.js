function sort(data, sortBy, sortDirection) {
  if (!Array.isArray(data)) {
    console.error("data is not array");
    return;
  }
  const direction = sortDirection === "descend" ? -1 : 1;
  data.sort((a, b) => {
    if (typeof a[sortBy] === "string") {
      return direction * a[sortBy].localeCompare(b[sortBy]);
    }
    return direction * (a[sortBy] - b[sortBy]);
  });
}

export default sort;
