const { ZodError } = require("zod");

function validate(schema, source = "body") {
  return function (req, res, next) {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      // Chuyển lỗi Zod thành dạng dễ đọc: { field: ["lỗi 1", "lỗi 2"] }
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json({ errors });
    }

    // Ghi đè lại req[source] bằng dữ liệu đã được Zod parse + transform
    // Ví dụ: email đã được .toLowerCase(), số đã được .coerce()
    req[source] = result.data;
    next();
  };
}

module.exports = validate;
