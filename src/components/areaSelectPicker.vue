<template>
    <div class="area-picker" v-if="show">
        <div class="picker-box">
            <div class="picker-box-title dis-flex">
                <span class="title">所在地区</span>
                <span class="close" @click="onClose">
                    <i class="iconfont icon-shanchu2"></i>
                </span>
            </div>
            <div class="selected-area dis-flex">
                <span class="selected-area-item" :class="{ active: tabIndex === 0 }" @click="onTab(0)">
                    <template v-if="objSelectProvince.AreaName">{{objSelectProvince.AreaName}}</template>
                    <template v-else>请选择</template>
                </span>
                <span class="selected-area-item" :class="{ active: tabIndex === 1 }" @click="onTab(1)">
                    <template v-if="objSelectCity.AreaName">{{objSelectCity.AreaName}}</template>
                    <template v-else>请选择</template>
                </span>
                <span class="selected-area-item" :class="{ active: tabIndex === 2 }" @click="onTab(2)">
                    <template v-if="objSelectDistrict.AreaName">{{objSelectDistrict.AreaName}}</template>
                    <template v-else>请选择</template>
                </span>
                <span class="selected-area-item" :class="{ active: tabIndex === 3 }" @click="onTab(3)">
                    <template v-if="objSelectStreet.AreaName">{{objSelectStreet.AreaName}}</template>
                    <template v-else>请选择</template>
                </span>
            </div>
            <div class="area-info">
                <scroll-view scroll-y>
                    <template v-if="tabIndex === 0">
                        <div class="area-list">
                            <div class="area-list-item" :class="{ active: item.isSelect }"
                                v-for="(item, index) in arrProvince" :key="index" @click="onSelect(arrProvince, index)">
                                {{item.AreaName}}
                                <i class="iconfont icon-gouxuan" v-if="item.isSelect"></i>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="tabIndex === 1">
                        <div class="area-list">
                            <div class="area-list-item" :class="{ active: item.isSelect }"
                                v-for="(item, index) in arrCity" :key="index" @click="onSelect(arrCity, index)">
                                {{item.AreaName}}
                                <i class="iconfont icon-gouxuan" v-if="item.isSelect"></i>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="tabIndex === 2">
                        <div class="area-list">
                            <div class="area-list-item" :class="{ active: item.isSelect }"
                                v-for="(item, index) in arrDistrict" :key="index" @click="onSelect(arrDistrict, index)">
                                {{item.AreaName}}
                                <i class="iconfont icon-gouxuan" v-if="item.isSelect"></i>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="area-list">
                            <div class="area-list-item" :class="{ active: item.isSelect }"
                                v-for="(item, index) in arrStreet" :key="index" @click="onSelect(arrStreet, index)">
                                {{item.AreaName}}
                                <i class="iconfont icon-gouxuan" v-if="item.isSelect"></i>
                            </div>
                        </div>
                    </template>
                </scroll-view>
            </div>
        </div>
    </div>
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
                tabIndex: 0,
                arrProvince: [],
                arrCity: [],
                arrDistrict: [],
                arrStreet: [],
                objSelectProvince: {
                    AreaName: "",
                    AreaCode: ""
                },
                objSelectCity: {
                    AreaName: "",
                    AreaCode: ""
                },
                objSelectDistrict: {
                    AreaName: "",
                    AreaCode: ""
                },
                objSelectStreet: {
                    AreaName: "",
                    AreaCode: ""
                },
                objOrigin: {
                    AreaName: "",
                    AreaCode: ""
                },
                objAreaDataOut: {
                    PCode: 0
                }
            };
        },
        watch: {
            "objSelectProvince.AreaName": function (nV) {
                if (nV) {
                    this.arrCity = [];
                    this.arrDistrict = [];
                    this.arrStreet = [];
                    this.objSelectCity = JSON.parse(JSON.stringify(this.objOrigin));
                    this.objSelectDistrict = JSON.parse(JSON.stringify(this.objOrigin));
                    this.objSelectStreet = JSON.parse(JSON.stringify(this.objOrigin));
                }
            },
            "objSelectCity.AreaName": function (nV) {
                if (nV) {
                    this.arrDistrict = [];
                    this.arrStreet = [];
                    this.objSelectDistrict = JSON.parse(JSON.stringify(this.objOrigin));
                    this.objSelectStreet = JSON.parse(JSON.stringify(this.objOrigin));
                }
            },
            "objSelectDistrict.AreaName": function (nV) {
                if (nV) {
                    this.arrStreet = [];
                    this.objSelectStreet = JSON.parse(JSON.stringify(this.objOrigin));
                }
            }
        },
        methods: {
            onTab(index) {
                this.tabIndex = index;
            },
            onSelect(arr, index) {
                arr.forEach((item, i) => {
                    if (i === index) {
                        item.isSelect = true;
                        this.objAreaDataOut.PCode = item.AreaCode;
                        if (this.tabIndex === 0) {
                            this.objSelectProvince = item;
                        } else if (this.tabIndex === 1) {
                            this.objSelectCity = item;
                        } else if (this.tabIndex === 2) {
                            this.objSelectDistrict = item;
                        } else {
                            this.objSelectStreet = item;
                        }
                    } else {
                        item.isSelect = false;
                    }
                });
                if (this.tabIndex < 3) {
                    this.tabIndex += 1;
                    this.getAreaData();
                } else {
                    let finalArea = [
                        this.objSelectProvince.AreaName,
                        this.objSelectCity.AreaName,
                        this.objSelectDistrict.AreaName,
                        this.objSelectStreet.AreaName
                    ].join(",");
                    let finalAreaCode = this.objSelectStreet.AreaCode;
                    this.$emit("picked", {
                        Area: finalArea,
                        Code: finalAreaCode
                    });
                    this.initParam();
                    this.$emit("update:show", false);
                }
            },
            getAreaData() {
                mpvue.fetchData({
                    API: "/api/Misc/GetAreaInfo",
                    para: this.objAreaDataOut,
                    callback: data => {
                        data.forEach(item => {
                            item.isSelect = false;
                        });
                        if (this.tabIndex === 0) {
                            this.arrProvince = data;
                        } else if (this.tabIndex === 1) {
                            this.arrCity = data;
                        } else if (this.tabIndex === 2) {
                            this.arrDistrict = data;
                        } else {
                            this.arrStreet = data;
                        }
                    }
                });
            },
            onClose() {
                this.initParam();
                this.$emit("update:show", false);
            },
            initParam() {
                this.tabIndex = 0;
                this.arrCity = [];
                this.arrDistrict = [];
                this.arrStreet = [];
                this.objSelectProvince = {
                    AreaName: "",
                    AreaCode: ""
                };
                this.objSelectCity = {
                    AreaName: "",
                    AreaCode: ""
                };
                this.objSelectDistrict = {
                    AreaName: "",
                    AreaCode: ""
                };
                this.objSelectStreet = {
                    AreaName: "",
                    AreaCode: ""
                };
                this.objOrigin = {
                    AreaName: "",
                    AreaCode: ""
                };
                this.objAreaDataOut = {
                    PCode: 0
                };
                this.arrProvince.forEach(item => {
                    item.isSelect = false;
                });
            }
        },
        onLoad() {
            if (this.arrProvince.length < 1) {
                this.getAreaData();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/SCSS/base/_variables.scss";

    .area-picker {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        z-index: 100;

        .picker-box {
            position: absolute;
            background: #fff;
            left: 0;
            bottom: 0;
            width: 100vw;
            animation: show 0.3s ease-out;

            &-title {
                justify-content: space-between;
                line-height: 80rpx;
                color: #999;
                padding-left: 20rpx;
                padding-right: 20rpx;
            }

            .selected-area {
                line-height: 98rpx;
                font-size: 30rpx;
                background: #efefef;

                &-item {
                    width: 25%;
                    position: relative;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-left: 10rpx;
                    padding-right: 10rpx;

                    &::after {
                        content: "";
                        width: 100%;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        border-bottom: solid 4rpx transparent;
                    }

                    &.active {
                        color: $color-primary;

                        &::after {
                            border-bottom-color: $color-primary;
                        }
                    }
                }
            }

            .area-info {
                scroll-view {
                    height: 400rpx;
                }

                .area-list {
                    animation: show 0.3s ease-out;
                    padding: 0 30rpx;
                    box-sizing: border-box;

                    &-item {
                        line-height: 80rpx;
                        display: flex;

                        &.active {
                            color: $color-danger;

                            .iconfont {
                                font-size: 50rpx;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
    }

    @keyframes show {
        from {
            transform: translate(0, 100%);
            opacity: 0;
        }

        to {
            transform: translate(0, 0);
            opacity: 1;
        }
    }

    @keyframes switch {
        from {
            transform: skew(-20deg, 0) translateX(-100%);
        }

        to {
            transform: skew(0, 0), translateX(0);
        }
    }
</style>