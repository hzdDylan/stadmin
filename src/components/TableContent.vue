<script>
export default {
    props: {
        // 要求输入格式，数组，输入内容
        /**
         * 0 1 0 0 1 0 1 这样的7行12列格式，分布代表周几的24小时内情况
         */
        timeDistribution: Array,
        // 输入标题
        title: String
    }
}
</script>

<template>
    <thead>
        <tr>
        <th></th>
        <th>0</th>
        <th>2</th>
        <th>4</th>
        <th>6</th>
        <th>8</th>
        <th>10</th>
        <th>12</th>
        <th>14</th>
        <th>16</th>
        <th>18</th>
        <th>20</th>
        <th>22</th>
        <th>24</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>星期一</td>
        <td v-for="(time,idx) in timeDistribution[0]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期二</td>
        <td v-for="(time,idx) in timeDistribution[1]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期三</td>
        <td v-for="(time,idx) in timeDistribution[2]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期四</td>
        <td v-for="(time,idx) in timeDistribution[3]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期五</td>
        <td v-for="(time,idx) in timeDistribution[4]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期六</td>
        <td v-for="(time,idx) in timeDistribution[5]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>

        <tr>
        <td>星期日</td>
        <td v-for="(time,idx) in timeDistribution[6]" :key="idx" :colspan="time">
            <div v-if="time !== 1" class="double-sided-arrow">
                <div class="left-arrow"></div>
                <div class="cross-bar"></div>
                <div class="right-arrow"></div>
            </div>
        </td>
        </tr>
    </tbody>
</template>

<style lang="scss" scoped>
$--border-color : #6da8ca;

.double-sided-arrow {
    display: flex;

    .cross-bar {
        margin-top: 11px;
        border-top: 8px solid $--border-color;
        height: 0;
        width: 100%;
        overflow: hidden;
    }

    .left-arrow {
        width: 0;
        height: 0;
        border-right: 15px solid $--border-color;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
    }

    .right-arrow {
        width: 0;
        height: 0;
        border-left: 15px solid $--border-color;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
    }
}
</style>