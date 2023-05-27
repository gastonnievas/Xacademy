// Utilizamos este middleware de autenticación para bloquear o permitir ejecuciones del endpoint.

const passport = require("passport"); // Utilizamos passport para manejar la autenticación
const passportJwt = require("passport-jwt"); // Utilizamos passport-jwt como estrategia.
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const secret = "claveSecretaParaGenerarTokens"; // Creamos una clave para generar el token.

// Le decimos a passport que use esta estrategia de autenticación
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        },
        (jwtPayload, done) => {
            const user = jwtPayload;
            return done(null, user);
        }
    )
);

const authMiddleware = passport.authenticate("jwt", {session: false});

// Método para validar permisos con manejo de errores.
const authIsAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "Admin"){
        return next();
    }
    res.status(401).json({ error: "El usuario no es Admin."});
};

// Exportamos la clave secreta, y los metodos de autenticación y validación.
module.exports = { secret, authMiddleware, authIsAdmin };