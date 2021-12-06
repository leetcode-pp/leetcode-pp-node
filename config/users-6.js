function join(s) {
    return s
        .split(/\n/)
        .filter(Boolean)
        .map((v) => String.prototype.trim.call(v))
        .map((v) => String.prototype.toLocaleLowerCase.call(v));
}

exports.users = join(`
azl397985856
  `);
