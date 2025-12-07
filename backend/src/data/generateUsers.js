module.exports = function generateUsers(count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      id: i + 1,
      name: `user${i + 1}`,
      age: 18 + (i % 50),
      salary: Math.floor(3000 + Math.random() * 10000),
    });
  }
  return arr;
};
