var router = require('express').Router();
const Docente = require('../modelos/Docentes');
const Curso = require('../modelos/Cursos');

router.post('/crearCurso', async (req, res) => {
    let miNuevoCurso = new Curso({
        nombre: req.body.nombre,
        ciclo: req.body.ciclo,
        listaDeEstudiantes: req.body.listaDeEstudiantes,
        idDocente: req.body.idDocente
    });

    miNuevoCurso.save()
        .then((nodo) => {
            res.json({
                status: "ok",
                nodoCreado: nodo
            });
        })
        .catch((err) => {
            res.json({
                status: "fail",
                error: err
            });
        });
});

router.post('/crearDocente', async (req, res) => {
    let miNuevoDocente = new Docente({
        nombre: req.body.nombre,
        informacionLaboral: req.body.informacionLaboral
    });

    miNuevoDocente.save()
        .then((nodo) => {
            res.json({
                status: "ok",
                nodoCreado: nodo
            });
        })
        .catch((err) => {
            res.json({
                status: "fail",
                error: err
            });
        });
});

router.get('/obtenerTodosLosCursos', async (req, res) => {

    Curso.find()
        .then((losNodos) => {
            res.json({
                "status": "ok",
                "cursos": losNodos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

router.get('/obtenerTodosLosDocentes', async (req, res) => {

    Docente.find()
        .then((losNodos) => {
            res.json({
                "status": "ok",
                "docentes": losNodos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

router.get('/obtenerCursoPorId/:id', async (req, res) => {

    let idTarget = req.params.id;

    Curso.findById(idTarget)
        .then((elCurso) => {

            Docente.findById(elCurso.idDocente)
                .then((elDocente) => {


                    let miCursoTarget = elCurso.toObject();
                    miCursoTarget.docente = elDocente;
                    miCursoTarget.miOtraVariable = "AA";

                    res.json({
                        "status": "ok",
                        "curso": miCursoTarget
                    });
                })
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

router.get('/obtenerCursoPorNombre', async (req, res) => {

    let nombreTarget = "React JS";

    Curso.find({ "nombre": nombreTarget })
        .then((elNodo) => {
            res.json({
                "status": "ok",
                "curso": elNodo
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

router.put('/actualizarDocente/:id', async (req, res) => {

    Docente.findByIdAndUpdate(req.params.id,
        req.body.queryUpdate)
        .then(() => {
            res.json({
                "status": "ok"
        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});

module.exports = router;