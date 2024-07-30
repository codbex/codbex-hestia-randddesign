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
import { PurchaseOrderRepository as PurchaseOrderDao } from "../../../../codbex-orders/gen/codbex-orders/dao/purchaseorder/PurchaseOrderRepository";
import { PurchaseOrderItemRepository as PurchaseOrderItemDao } from "../../../../codbex-orders/gen/codbex-orders/dao/purchaseorder/PurchaseOrderItemRepository";
import { SupplierRepository as SupplierDao } from "../../../../codbex-partners/gen/dao/Suppliers/SupplierRepository";
import { ProductRepository as ProductDao } from "../../../../codbex-products/gen/dao/Products/ProductRepository";
import { CompanyRepository as CompanyDao } from "../../../../codbex-companies/gen/dao/Companies/CompanyRepository";
import { CityRepository as CityDao } from "../../../../codbex-cities/gen/dao/Cities/CityRepository";
import { CountryRepository as CountryDao } from "../../../../codbex-countries/gen/dao/Countries/CountryRepository";
import { PaymentMethodRepository as PaymentMethodDao } from "../../../../codbex-methods/gen/dao/Methods/PaymentMethodRepository";
import { SentMethodRepository as SentMethodDao } from "../../../../codbex-methods/gen/dao/Methods/SentMethodRepository";
import { Controller, Get } from "sdk/http";
let PurchaseOrderService = (() => {
    let _classDecorators = [Controller];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _purchaseOrderData_decorators;
    var PurchaseOrderService = _classThis = class {
        constructor() {
            this.purchaseOrderDao = (__runInitializers(this, _instanceExtraInitializers), void 0);
            this.purchaseOrderDao = new PurchaseOrderDao();
            this.purchaseOrderItemDao = new PurchaseOrderItemDao();
            this.supplierDao = new SupplierDao();
            this.productDao = new ProductDao();
            this.companyDao = new CompanyDao();
            this.cityDao = new CityDao();
            this.countryDao = new CountryDao();
            this.paymentMethodDao = new PaymentMethodDao();
            this.sentMethodDao = new SentMethodDao();
        }
        purchaseOrderData(_, ctx) {
            const purchaseOrderId = ctx.pathParameters.purchaseOrderId;
            let purchaseOrder = this.purchaseOrderDao.findById(purchaseOrderId);
            let paymentMethod = this.paymentMethodDao.findById(purchaseOrder.PaymentMethod);
            let sentMethod = this.sentMethodDao.findById(purchaseOrder.SentMethod);
            purchaseOrder.PaymentMethod = paymentMethod.Name;
            purchaseOrder.SentMethod = sentMethod.Name;
            let purchaseOrderItems = this.purchaseOrderItemDao.findAll({
                $filter: {
                    equals: {
                        PurchaseOrder: purchaseOrder.Id
                    }
                }
            });
            purchaseOrderItems.forEach((item) => {
                let product = this.productDao.findById(item.Product);
                item.Product = product.Name;
            });
            let company;
            if (purchaseOrder.Company) {
                company = this.companyDao.findById(purchaseOrder.Company);
                let city = this.cityDao.findById(company.City);
                let country = this.countryDao.findById(company.Country);
                company.CityName = city.Name;
                company.Country = country.Name;
            }
            let supplier = this.supplierDao.findById(purchaseOrder.Supplier);
            return {
                purchaseOrder: purchaseOrder,
                purchaseOrderItems: purchaseOrderItems,
                supplier: supplier,
                company: company
            };
        }
    };
    __setFunctionName(_classThis, "PurchaseOrderService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _purchaseOrderData_decorators = [Get("/:purchaseOrderId")];
        __esDecorate(_classThis, null, _purchaseOrderData_decorators, { kind: "method", name: "purchaseOrderData", static: false, private: false, access: { has: obj => "purchaseOrderData" in obj, get: obj => obj.purchaseOrderData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PurchaseOrderService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PurchaseOrderService = _classThis;
})();
