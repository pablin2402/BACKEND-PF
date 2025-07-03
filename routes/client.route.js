const expres = require("express");
const router = expres.Router();

const clientController = require("../controllers/ClientController");
const salesManController = require("../controllers/SalesManController");
const {authenticateToken} = require("../middlewares/authentication.js");
const orderPayController = require("../controllers/OrderPayController");
const deliveryController = require("../controllers/DeliveryController.js");
const salesManActivityController = require("../controllers/SalesManActivityController");
const upload = require("./upload");
const deliveryRouteController = require("../controllers/DeliveryRouteController.js");
const upload1 = require("../services/uploadToS3.js");
const salesPrediction = require("../controllers/SalesPredictionController.js");

router
.post("/upload/image", upload1.single('image'), (req, res) => {
    if (!req.file || !req.file.location) {
      return res.status(400).json({ message: 'Error al subir imagen' });
    }
    const imageUrl = req.file.location;

    res.json({ imageUrl });
})
.post("/client",authenticateToken, clientController.postClient)
.post("/client/message/id", authenticateToken,clientController.getMessagesById)
.post("/client/list/id", authenticateToken,clientController.getClients)
.post("/client/id", authenticateToken,clientController.getClientInfoById)
.post("/client/archived",authenticateToken, clientController.getClientsArchived)
.post("/client/sales",authenticateToken, clientController.getClientInfoByIdAndSales)

.post("/delivery",authenticateToken, deliveryController.postNewDelivery)
.post("/delivery/list",authenticateToken, deliveryController.getDelivery)
.post("/delivery/id", deliveryController.getDeliveryById)

.post("/delivery/order/image", deliveryController.postDeliveryOrderPickUp)
.post("/delivery/order/id", deliveryController.getDeliveryOrderPickUpByOrderId)


.put("/client/archived",authenticateToken, clientController.updateUserStatus)
.post("/sales/list/id",authenticateToken, salesManController.getSalesMan)
.post("/sales/id", salesManController.getSalesManById)
.post("/sales/salesman", authenticateToken,salesManController.postNewAccount)
.post("/sales/location", authenticateToken,salesManController.getClientLocationById)
.post("/salesman/multiple",salesManController.getSalesManList1)
.put("/salesman/status",salesManController.uploadSalesmanStatus)

.post("/salesman/activity", salesManActivityController.postNewActivity)
.post("/salesman/date/id",salesManActivityController.getSalesManByIdAndDayActivity)
.post("/salesman/list/route",salesManActivityController.getAllRoutes)
.post("/salesman/activity/id", salesManActivityController.getSalesManByIdActivity)

.post("/salesman/route", salesManActivityController.postNewRoute)
.post("/salesman/route/id", salesManActivityController.getSalesManByIdRoute)
.post("/salesman/route/sales/id",salesManActivityController.getRouteSalesById)

.post("/delivert/route",authenticateToken, deliveryRouteController.postNewRoute)
.post("/delivery/list/route",authenticateToken, deliveryRouteController.getAllRoutes)
.post("/delivery/list/route/id", deliveryRouteController.getSalesManByIdRoute)
.post("/delivery/list/order/id", deliveryRouteController.getSalesManByIdRouteDelivery)

.delete("/route/sales/id", salesManActivityController.deleteRouteSalesById)
.put("/route/sales/id",authenticateToken,salesManActivityController.updateRouteSalesStatus)
.put("/route/progress/id",authenticateToken,salesManActivityController.updateRouteSalesProgress)
.put("/route/delivery/id",authenticateToken,deliveryRouteController.updateRouteSalesStatus)
.put("/route/delivery/progress/id",authenticateToken,deliveryRouteController.updateRouteSalesProgress)

.post("/sales/prediction",authenticateToken, salesPrediction.getProductMonthlyPrediction)


.post("/order/pay/list/id",authenticateToken, orderPayController.getOrderPay)
.post("/order/pay/list/calendar",authenticateToken, orderPayController.getOrderPayByCalendar)
.post("/order/pay/sales/id",authenticateToken, orderPayController.getOrderPayBySales)
.post("/order/pay",authenticateToken,orderPayController.postOrderPay)
.post("/order/pay/id",authenticateToken, orderPayController.getOrderPayId)
.put("/order/pay/status/id",authenticateToken, orderPayController.updateOrderPayStatus);


module.exports = router;