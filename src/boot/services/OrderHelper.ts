export default class OrderHelper
{
    constructor(t) {
        this.t = t
    }

    getStatusIcon(status) {
        if(status.code === 'N')
            return 'pending'
        else if(status.code === 'F')
            return 'done_all'
        else if(status.code === 'E')
            return 'error'
        else if(status.code === 'S')
            return 'done'
        else
            return 'pending'
    }

    getStatusColor(status) {
        if(status.code === 'N')
            return 'info'
        else if(status.code === 'F')
            return 'positive'
        else if(status.code === 'E')
            return 'negative'
        else if(status.code === 'S')
            return 'accent'
        else
            return 'info'
    }

    getOrderTypeLangPhrase(type) {
        if(type === 'flat_sale')
            return this.t('personalOrdersFlatSaleType')
        else if(type === 'flat_rent')
            return this.t('personalOrdersFlatRentType')
        else if(type === 'house_sale')
            return this.t('personalOrdersHouseSaleType')
        else if(type === 'house_rent')
            return this.t('personalOrdersHouseRentType')

        return 'unknown_type';
    }

    getPaymentStatusIcon(payment) {
        if(payment.status === 'error')
            return 'warning'
        else if(payment.status === 'paid')
            return 'done_all'
        else
            return 'pending'
    }

    getPaymentStatusColor(payment) {
        if(payment.status === 'error')
            return 'negative'
        else if(payment.status === 'paid')
            return 'positive'
        else
            return 'accent'
    }
}