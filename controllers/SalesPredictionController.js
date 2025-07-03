const Order = require("../models/Order");
const axios = require("axios");

const getProductMonthlyPrediction = async (req, res) => {
    try {
        const ventas = await Order.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: {
                        productName: "$products.nombre",
                        year: { $year: "$creationDate" },
                        month: { $month: "$creationDate" }
                    },
                    totalVentas: {
                        $sum: {
                            $multiply: ["$products.cantidad", "$products.precio"]
                        }
                    }
                }
            },
            { $sort: { "_id.productName": 1, "_id.year": 1, "_id.month": 1 } }
        ]);

        const productos = {};
        ventas.forEach(v => {
            const nombre = v._id.productName;
            const mes = v._id.month.toString().padStart(2, '0');
            const fecha = `${v._id.year}-${mes}-01`;

            if (!productos[nombre]) {
                productos[nombre] = [];
            }
            productos[nombre].push({
                ds: fecha,
                y: v.totalVentas
            });
        });

        // Enviar cada producto al microservicio
        const resultados = {};
        for (let producto in productos) {
            const { data } = await axios.post('http://localhost:8000/predict', { ventas: productos[producto] });
            resultados[producto] = data.predicciones;
        }

        return res.status(200).json({
            success: true,
            message: 'Predicción generada exitosamente por producto',
            predicciones: resultados
        });

    } catch (error) {
        console.error('Error en la predicción:', error.message);
        return res.status(500).json({ success: false, message: 'Error al generar la predicción' });
    }
};

module.exports = { getProductMonthlyPrediction };
