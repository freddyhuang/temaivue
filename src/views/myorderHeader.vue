<template>
    <div>
        <ul>
            <table cellpadding="0" cellspacing="0" class="mtab_table">
                <tr>
                    <td rowspan="2" class="ment_td" valign="top">
                        <ul>
                            <!-- <li>我的抢购</li> -->
                            <router-link to="/myorderHeader/myorder"><li>我的订单</li></router-link>
                            <router-link to="/myorderHeader/myredpack"><li>我的红包</li></router-link>
                            <router-link to="/myorderHeader/userinfo"><li>账号设置</li></router-link>

                        </ul>
                    </td>
                    <td class="title_td"></td>
                </tr>
                <router-view/>
           </table>
        </ul>
	
	</div>
</template>
<script>
export default {
    methods:{

    }
}
</script>

<style scoped>
  
    @import "../../static/css/myorder.css";
    .router-link-active{
       color: rgb(255, 144, 0);
    }
</style>


