var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { SalesOrderRepository as SalesOrderDao } from "../../../../codbex-orders/gen/codbex-orders/dao/salesorder/SalesOrderRepository";
import { SalesOrderItemRepository as SalesOrderItemDao } from "../../../../codbex-orders/gen/codbex-orders/dao/salesorder/SalesOrderItemRepository";
import { CustomerRepository as CustomerDao } from "../../../../codbex-partners/gen/dao/Customers/CustomerRepository";
import { ProductRepository as ProductDao } from "../../../../codbex-products/gen/dao/Products/ProductRepository";
import { CompanyRepository as CompanyDao } from "../../../../codbex-companies/gen/dao/Companies/CompanyRepository";
import { CityRepository as CityDao } from "../../../../codbex-cities/gen/dao/Cities/CityRepository";
import { CountryRepository as CountryDao } from "../../../../codbex-countries/gen/dao/Countries/CountryRepository";
import { PaymentMethodRepository as PaymentMethodDao } from "../../../../codbex-methods/gen/dao/Methods/PaymentMethodRepository";
import { SentMethodRepository as SentMethodDao } from "../../../../codbex-methods/gen/dao/Methods/SentMethodRepository";
import { Controller, Get } from "sdk/http";
let SalesOrderService = (() => {
    let _classDecorators = [Controller];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _salesOrderData_decorators;
    var SalesOrderService = _classThis = class {
        constructor() {
            this.salesOrderDao = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.salesOrderDao = new SalesOrderDao();
            this.salesOrderItemDao = new SalesOrderItemDao();
            this.customerDao = new CustomerDao();
            this.productDao = new ProductDao();
            this.companyDao = new CompanyDao();
            this.cityDao = new CityDao();
            this.countryDao = new CountryDao();
            this.paymentMethodDao = new PaymentMethodDao();
            this.sentMethodDao = new SentMethodDao();
        }
        salesOrderData(_, ctx) {
            const salesOrderId = ctx.pathParameters.salesOrderId;
            let salesOrder = this.salesOrderDao.findById(salesOrderId);
            let paymentMethod = this.paymentMethodDao.findById(salesOrder.PaymentMethod);
            let sentMethod = this.sentMethodDao.findById(salesOrder.SentMethod);
            salesOrder.PaymentMethod = paymentMethod.Name;
            salesOrder.SentMethod = sentMethod.Name;
            let salesOrderItems = this.salesOrderItemDao.findAll({
                $filter: {
                    equals: {
                        SalesOrder: salesOrder.Id
                    }
                }
            });
            salesOrderItems.forEach((item) => {
                let product = this.productDao.findById(item.Product);
                item.Product = product.Name;
            });
            let company;
            if (salesOrder.Company) {
                company = this.companyDao.findById(salesOrder.Company);
                let city = this.cityDao.findById(company.City);
                let country = this.countryDao.findById(company.Country);
                company.CityName = city.Name;
                company.Country = country.Name;
            }
            let customer = this.customerDao.findById(salesOrder.Customer);
            return {
                salesOrder: salesOrder,
                salesOrderItems: salesOrderItems,
                customer: customer,
                company: company
            };
        }
    };
    __setFunctionName(_classThis, "SalesOrderService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _salesOrderData_decorators = [Get("/:salesOrderId")];
        __esDecorate(_classThis, null, _salesOrderData_decorators, { kind: "method", name: "salesOrderData", static: false, private: false, access: { has: obj => "salesOrderData" in obj, get: obj => obj.salesOrderData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SalesOrderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SalesOrderService = _classThis;
})();
