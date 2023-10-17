const router = require('express').Router();
const { Recipe, User } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const path = require('path');

router.post('/', withAuth, async(req, res) => {
    console.log(req.body);
        // Step 1
    nodemailer.createTestAccount(async (err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        });

        // Step 2
        transporter.use('compile', hbs({
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }));

        // Step 3
        let mailOptions = {
        from: 'recipes@hotmail.com',
        to: req.session.email,
        subject: 'Sent Recipe!',
        text: 'Wooohooo it works!!',
        template: 'email',
        context: { body: req.body.content }
    };

        // Step 4
        const messageInfo = await transporter.sendMail(mailOptions); 
        const previewUrl = nodemailer.getTestMessageUrl(messageInfo);
        
        res.status(200).json(previewUrl);
        });
    }
)

module.exports = router;