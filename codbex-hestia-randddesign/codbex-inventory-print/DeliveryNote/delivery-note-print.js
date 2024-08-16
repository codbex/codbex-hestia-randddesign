const viewData = {
    id: 'delivery-note-print',
    label: 'Print',
    link: '/services/web/codbex-hestia-randddesign/codbex-inventory-print/DeliveryNote/print-delivery-note.html',
    perspective: 'DeliveryNote',
    view: 'DeliveryNote',
    type: 'entity',
    order: 87
};

if (typeof exports !== 'undefined') {
    exports.getDialogWindow = function () {
        return viewData;
    }
}