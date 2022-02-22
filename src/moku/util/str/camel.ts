const camel = (value: string): string =>
  value.replace(/-([a-z])/g, (g) => {
    const first = g[1];
    return first.toUpperCase();
  });

export default camel;
