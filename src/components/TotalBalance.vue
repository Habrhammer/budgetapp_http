<template>
  <div class="total-value" :style="balanceColor">
     Balance: {{totalBalance}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
name: 'TotalBalance',
computed: {
   ...mapGetters("list",["totalBalance","balanceColor"])
}
}
</script>

<style scoped>
   .total-value{
      font-size: 26px;
      text-transform: uppercase;
      padding: 20px;
      text-align: center;
   }

   
</style>