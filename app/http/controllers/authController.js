
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const { Passport } = require('passport/lib')
const passport = require('passport')
function authController(){
    return {
        login(req, res){
            res.render('auth/login')
        },

        postLogin(req, res, next){
            const{name, email, password} = req.body;
            //Validate Request
            if(!email || !password){
                req.flash('error', 'All fields are required');
                return res.redirect('/login')
            }
            
            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', 'Something went wrong');
                    return next(err)
                }
                if(!user){
                    req.flash('error', 'Invalid id or password');
                    return res.redirect('/login');
                }
                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', 'Something went wrong');
                        return next(err)
                    }
                    return res.redirect('/');
                })
        })(req, res, next)
    },

        register(req, res){
            res.render('auth/register')
        },
        async postRegister(req, res){
            const{name, email, password} = req.body;
            //Validate Request
            if(!name || !email || !password){
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register')
            }
            User.exists({email:email}, (err, result)=>{
                if(result){
                    req.flash('error', 'Email already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register')
                }   
            })

            ///Hash Password

            const hashedPassword = await bcrypt.hash(password, 10)

            ///Create a user
            const user = new User({
                name, 
                email,
                password: hashedPassword
            })

            user.save().then((user)=>{
                return res.redirect('/')
            }).catch(err=>{
                req.flash('error', 'something went wrong')
                return res.redirect('/register')
            })
        },
        logout(req, res){
            req.logout();
            return res.redirect('/login')
        }
    }
}

module.exports = authController