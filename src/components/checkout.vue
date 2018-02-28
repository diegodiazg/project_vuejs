<template>
  <div>
    <PayPal
      amount='10.00'
      currency='USD'
      env='sandbox'
      :items='myItems'
      :client='credentials'
    ></PayPal>
  </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout'

export default {
  name: 'checkout',
  data () {
    return {
      credentials: {
        sandbox: 'ARyNDMbKwa-zLx7AtfPa-etrhyTVAFd2UjEivZ6JvlQSsoWoEjaourX2',
        production: 'remedios.paraelalma-facilitator_api1.gmail.com'
      },
      myItems: [
        {
          'name': 'hat',
          'description': 'Brown hat.',
          'quantity': '1',
          'price': '5',
          'currency': 'USD'
        },
        {
          'name': 'handbag',
          'description': 'Black handbag.',
          'quantity': '1',
          'price': '5',
          'currency': 'USD'
        }
      ]
    }
  },
  components: {
    PayPal
  }
}
</script>
