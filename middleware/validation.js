const validationSiswaCreate = (req, res, next) => {
    const { name, email, alamat } = req.body;
    const errors = [];

    if (!name || name.trim().length < 2) errors.push('name wajib minimal 2 karakter');
    if (!email || email.trim().length < 2) errors.push('email wajib diisi');
    if (!alamat || alamat.trim().length < 2) errors.push('alamat wajib diisi');

    if (errors.length) return res.status(400).json({ errors });
    next();
};

const validateSiswaUpdate = (req, res, next) => {
    const { name, email, alamat } = req.body;
    const errors = [];

    if (!name || name.trim().length < 2) errors.push('name wajib minimal 2 karakter');
    if (!email || email.trim().length < 2) errors.push('email wajib diisi');
    if (!alamat || alamat.trim().length < 2) errors.push('alamat wajib diisi');

    if (errors.length) return res.status(400).json({ errors });
    next();
};

module.exports = {
    validateSiswaUpdate,
    validationSiswaCreate
};
