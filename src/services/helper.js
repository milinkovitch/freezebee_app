/* eslint-disable import/prefer-default-export */
export const groupBy = (array, property) =>
  array.reduce((prev, curr) => {
    const find = prev.find((p) => p[property] === curr[property]);
    return find
      ? prev.map((p) =>
          p[property] === curr[property] ? { ...p, groupBy: [...p.groupBy, curr] } : p
        )
      : [...prev, { ...curr, groupBy: [curr] }];
  }, []);
