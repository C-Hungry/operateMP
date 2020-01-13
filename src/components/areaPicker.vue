<template>

    <picker mode="multiSelector" @change="bindMultiPickerChange($event)"
        @columnchange="bindMultiPickerColumnChange($event)" :value="multiIndex" range-key="AreaName" :range="multiArray"
        v-if="show">
        <!-- <view class="picker">
            {{searchArea}}
        </view> -->
        <slot></slot>
    </picker>

</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                multiArray: [
                    [{
                        AreaName: "省",
                        AreaCode: ""
                    }],
                    [{
                        AreaCode: "",
                        AreaName: "市"
                    }],
                    [{
                        AreaCode: "",
                        AreaName: "区"
                    }]
                ],
                curColume: 0,
                pCode: 0,
                multiIndex: [0, 0, 0],
                searchCode: "",
            }
        },
        methods: {
            bindMultiPickerChange(e) {
                var arrArea = e.mp.detail.value;
                let tempAreaCode = "";
                let tempIndex = "";
                this.searchArea = "";
                arrArea.forEach((el, index) => {
                    if (this.multiArray[index].length > 0) {
                        this.searchArea += this.multiArray[index][el].AreaName;
                        this.searchCode = this.multiArray[index][el].AreaCode;
                    }
                });
                this.$emit("picked", {
                    AreaCode: this.searchCode,
                    AreaName: this.searchArea
                });
                // this.$emit("update:show", false);
            },
            bindMultiPickerColumnChange(e) {
                this.curColume = e.mp.detail.column;
                let curVal = e.mp.detail.value;
                let curData = this.multiArray[this.curColume][curVal].AreaCode;
                this.multiIndex[this.curColume] = curVal;
                if (this.curColume < 2) {
                    this.pCode = curData;
                    this.getAreaInfo(this.curColume + 1);
                }
            },
            getAreaInfo(curColume) {
                let pCode = this.pCode;
                mpvue.fetchData({
                    API: '/api/Misc/GetAreaInfo',
                    para: {
                        pCode: pCode
                    },
                    callback: (data) => {
                        let colume = curColume || 0;
                        this.multiArray.splice(colume, 1, data);
                        // if (colume == 1) {
                        //     this.multiArray[2] = [];
                        // }
                        if (colume < 2) {
                            this.pCode = this.multiArray[colume][0].AreaCode;
                            this.getAreaInfo(colume + 1);
                        }

                    }
                })
            }
        },
        onLoad() {
            console.log("area-onLoad")
            this.getAreaInfo();
        }
    }
</script>