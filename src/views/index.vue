<!--
 * @Author : zhangmm
 * @LastEditors: zhangmm
 * @Date   : 2021-08-19 08:58
-->
<template>
  <div style="height: 100%; width: 100%;">
    <div class="super-flow-demo1">
      <div class="node-container" v-click-outside="handleClose">
        <div class="node-item" v-for="item in basicNodeList" :key="item.id">
          <el-popover placement="right" width="300" trigger="manual" v-model="item.editVisible">
            <el-form :model="form">
              <el-form-item label="节点ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" autocomplete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="节点名称" :label-width="formLabelWidth">
                <el-input v-model="form.label" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: right; margin: 0;">
              <el-button size="mini" type="text" @click="item.editVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="updateNode">确定</el-button>
            </div>
            <button
              :disabled="item.disabled"
              :class="{ disabled: item.disabled }"
              draggable
              @dragend="onDragend($event, item)"
              @click="showOperate($event, item)"
              slot="reference"
            >
              {{ item.label }}
            </button>
          </el-popover>
        </div>
        <el-popover placement="right" width="300" trigger="click" v-model="visible">
          <el-form :model="form">
            <el-form-item label="节点ID" :label-width="formLabelWidth">
              <el-input v-model="form.id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="节点名称" :label-width="formLabelWidth">
              <el-input v-model="form.label" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right; margin: 0;">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="addNode">确定</el-button>
          </div>
          <button class="plus-button" slot="reference"><i class="el-icon-plus"></i></button>
        </el-popover>
        <div
          class="operate-panel"
          :style="{
            position: 'fixed',
            left: position.x + 'px',
            top: position.y + 'px',
            zIndex: position.x === 0 ? -1 : 10
          }"
        >
          <div @click="editNode">编辑</div>
          <div @click="deleteNode">删除</div>
        </div>
        <!-- <button @click="addTemplate">addTemplate</button> -->
      </div>
      <div class="flow-container">
        <simple-flow-chart
          ref="superFlow"
          :nodeMenu="nodeMenu"
          :linkMenu="linkMenuList"
          :linkBaseStyle="linkBaseStyle"
          :linkList="nodeRelationArray"
          :nodeList="processNodeRelationArray"
          :maxTotal="maxTotal"
          :range="range"
          style="width: 200%; overflow-y: inherit;"
        >
          <template v-slot:node="{ meta }">
            <div @click="handleNodeClick(meta.id)" class="flow-node ellipsis">
              <!-- :class="{ active: activeNodeId === meta.id }" -->
              <div></div>
              <div>{{ meta.label }}</div>
              <div></div>
            </div>
          </template>
        </simple-flow-chart>
      </div>
      <div class="form-container">
        <el-form ref="flowForm" :model="flowForm" label-width="90px">
          <el-form-item label="流程编号">
            <el-input v-model="flowForm.number"></el-input>
          </el-form-item>
          <el-form-item label="流程名称">
            <el-input v-model="flowForm.name"></el-input>
          </el-form-item>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>流程模板筛选</span>
            </div>
            <template>
              <el-form-item label="航司">
                <el-select v-model="flowForm.airline" filterable multiple placeholder="请选择航司">
                  <el-option label="4B" value="1"></el-option>
                  <el-option label="4G" value="2"></el-option>
                  <el-option label="5B" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机型">
                <el-select v-model="flowForm.aircraftType" filterable multiple placeholder="请选择机型">
                  <el-option label="A320" value="1"></el-option>
                  <el-option label="A319" value="2"></el-option>
                  <el-option label="A344" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="进出港类型">
                <el-radio-group v-model="flowForm.type" @change="changeType" size="small">
                  <el-radio-button :label="1">始发</el-radio-button>
                  <el-radio-button :label="2">停场</el-radio-button>
                  <el-radio-button :label="3">过站</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="过站时长" v-if="flowForm.type == 3">
                <el-select v-model="flowForm.duration" placeholder="请选择过站时长" @change="changeDuration">
                  <el-option label="40分钟" value="40"></el-option>
                  <el-option label="50分钟" value="50"></el-option>
                  <el-option label="60分钟" value="60"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-card>

          <el-form-item>
            <el-button type="primary" @click="submit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>

          <el-form-item label="配置模板校验节点范围" v-if="flowForm.type == 3">
            <el-select v-model="range" multiple placeholder="请选择" @change="changeRange">
              <el-option v-for="item in basicNodeList" :key="item.id" :label="item.label" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

const basicNodeInfo = {
  width: 90,
  height: 72
};

export default {
  data() {
    return {
      activeNodeId: null,
      range: ['start', 'end'],
      basicNodeList: [
        {
          id: 'start',
          label: '开始'
        },
        {
          id: 'hwjj',
          label: '护卫交接'
        },
        {
          id: 'qtdj',
          label: '桥/梯对接'
        },
        {
          id: 'jwjc',
          label: '机务检查'
        },
        {
          id: 'djqz',
          label: '对接桥载'
        },
        {
          id: 'khcm',
          label: '开货舱门'
        },
        {
          id: 'kkcm',
          label: '开客舱门'
        },
        {
          id: 'qjks',
          label: '清洁开始'
        },
        {
          id: 'pcks',
          label: '配餐开始'
        },
        {
          id: 'qjjs',
          label: '清洁结束'
        },
        {
          id: 'jwfx',
          label: '机务放行'
        },
        {
          id: 'pcjs',
          label: '配餐结束'
        },
        {
          id: 'jyjs',
          label: '加油结束'
        },
        {
          id: 'zjks',
          label: '装机开始'
        },
        {
          id: 'djks',
          label: '登机开始'
        },
        {
          id: 'djjs',
          label: '登机结束'
        },
        {
          id: 'zjjs',
          label: '装机结束'
        },
        {
          id: 'gkcm',
          label: '关客舱门'
        },
        {
          id: 'clqz',
          label: '撤离桥载'
        },
        {
          id: 'qtcl',
          label: '桥/梯撤离'
        },
        {
          id: 'ghcm',
          label: '关货舱门'
        },
        {
          id: 'sqfx',
          label: '申请放行'
        },
        {
          id: 'tyfx',
          label: '同意放行'
        },
        {
          id: 'jwcbks',
          label: '机位除冰开始'
        },
        {
          id: 'jwcbjs',
          label: '机位除冰结束'
        },
        {
          id: 'sqkc',
          label: '申请开车'
        },
        {
          id: 'tykc',
          label: '同意开车'
        },
        {
          id: 'cld',
          label: '撤轮挡'
        },
        {
          id: 'qf',
          label: '起飞'
        },
        {
          id: 'qzqf',
          label: '前站起飞'
        },
        {
          id: 'ldgx',
          label: '雷达更新'
        },
        {
          id: 'zhjj',
          label: '最后进近'
        },
        {
          id: 'ld',
          label: '落地'
        },
        {
          id: 'xjks',
          label: '卸机开始'
        },
        {
          id: 'xjjs',
          label: '卸机结束'
        },
        {
          id: 'dld',
          label: '挡轮挡'
        },
        {
          id: 'xkjs',
          label: '下客结束'
        },
        {
          id: 'dghbdmyj',
          label: '到港航班地面移交'
        },
        {
          id: 'jhdw',
          label: '监护到位'
        },
        {
          id: 'qwdw',
          label: '勤务到位'
        },
        {
          id: 'hkqrw',
          label: '航空器入位'
        },
        {
          id: 'fbmbcldsj',
          label: '发布目标撤轮挡时间'
        },
        {
          id: 'fbmbxkkcsj',
          label: '发布目标许可开车时间'
        },
        {
          id: 'ksxk',
          label: '开始下客'
        },
        {
          id: 'hyxlxz',
          label: '货邮行李卸载'
        },
        {
          id: 'hyxlzz',
          label: '货邮行李装载'
        },
        {
          id: 'jzdw',
          label: '机组到位'
        },
        {
          id: 'ksbj',
          label: '开始保洁'
        },
        {
          id: 'wcbj',
          label: '完成保洁'
        },
        {
          id: 'kspw',
          label: '开始排污'
        },
        {
          id: 'wcpw',
          label: '完成排污'
        },
        {
          id: 'ksjqs',
          label: '开始加清水'
        },
        {
          id: 'wcjqs',
          label: '完成加清水'
        },
        {
          id: 'ksjy',
          label: '开始加油'
        },
        {
          id: 'jhcl',
          label: '监护撤离'
        },
        {
          id: 'qwcl',
          label: '勤务撤离'
        },
        {
          id: 'hkqtc',
          label: '航空器推出'
        },
        {
          id: 'lghbdmyj',
          label: '离港航班地面移交'
        },
        {
          id: 'end',
          label: '结束'
        }
      ],
      aList: [
        // 始发
        {
          linkList:
            '[{"id":"linkRq1yUpe4iS23U9kM","startId":"start","endId":"hwjj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkiIuvcSANV8i9a4he","startId":"hwjj","endId":"qtdj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkAIy9LwUDd1kAgUGY","startId":"kkcm","endId":"qjks","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkEC87UNVRmUc2OZ7G","startId":"qjjs","endId":"djks","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkzKaQFLF8mOu1eMX4","startId":"hwjj","endId":"jwjc","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkp1md41r3TJmuDLqr","startId":"qjks","endId":"qjjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linki8iSqIVmPL2GRocr","startId":"pcjs","endId":"djks","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link6TDseQQItDl025rL","startId":"kkcm","endId":"pcks","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkATTI3fNuHAbkf4xn","startId":"ksjy","endId":"jyjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link1oLk9oD0NvwlQe4u","startId":"djks","endId":"djjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkUaXh7d9NHs2exUeR","startId":"gkcm","endId":"qtcl","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkqi1Yi73GI8QgH85A","startId":"jwjc","endId":"jwfx","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkfv7PyPeTqyezVGaJ","startId":"hwjj","endId":"khcm","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkG3gHUfle30SmS25R","startId":"tyfx","endId":"sqkc","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkkdQaOu9CceP0mJ39","startId":"qtcl","endId":"clqz","startAt":[45,0],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkpzl11Kl8NG0uxEYo","startId":"djjs","endId":"gkcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkuCfXfmUsyxOF8BWZ","startId":"tykc","endId":"cld","startAt":[45,72],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkiduNTTdPcxITm0vG","startId":"sqkc","endId":"tykc","startAt":[45,72],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linka16YDpAlJPG6rfhS","startId":"jwfx","endId":"djks","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkEOCwz6iEzTJmcSjl","startId":"sqfx","endId":"tyfx","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkDUBH2oCtuoLUtTi6","startId":"jwcbjs","endId":"cld","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkL3v3vhlajIKPVqn9","startId":"jwcbks","endId":"jwcbjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkEdiPgyTVCcfUIvmp","startId":"zjks","endId":"zjjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkiinQoBaPPkKJDf27","startId":"khcm","endId":"zjks","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkipvLLd2ige5aZ1r2","startId":"cld","endId":"qf","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkWX2O60HXwVrZnb4p","startId":"qf","endId":"end","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkpeNLGNiIkqmf5R8E","startId":"qtcl","endId":"jwcbks","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linktNuUP7aLjWRMDUiL","startId":"jyjs","endId":"gkcm","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkQ2icHnu7K1g6hsxL","startId":"qtcl","endId":"ghcm","startAt":[45,72],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkqAkAC0C5yy2uqs5K","startId":"zjjs","endId":"ghcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkaPN03uDbYdzBIP9d","startId":"pcks","endId":"pcjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkeKd1ZsEWAQKANvyf","startId":"qtdj","endId":"djqz","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link5fTzDZ9xne0MuYjO","startId":"qtdj","endId":"kkcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkFC7h2SEZ6mRQxeN3","startId":"kkcm","endId":"ksjy","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkS0LJzSw77JQcgO0o","startId":"ghcm","endId":"cld","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"link4BS9DZoN3xC3Hu0f","startId":"qtcl","endId":"cld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}}]',
          nodeList:
            '[{"id":"start","width":90,"height":72,"coordinate":[42,300],"meta":{"width":90,"height":72,"id":"start","label":"开始"}},{"id":"hwjj","width":90,"height":72,"coordinate":[197,300],"meta":{"width":90,"height":72,"id":"hwjj","label":"护卫交接","disabled":false}},{"id":"qtdj","width":90,"height":72,"coordinate":[348,300],"meta":{"width":90,"height":72,"id":"qtdj","label":"桥/梯对接","disabled":false}},{"id":"jwjc","width":90,"height":72,"coordinate":[407,92],"meta":{"width":90,"height":72,"id":"jwjc","label":"机务检查","disabled":false}},{"id":"kkcm","width":90,"height":72,"coordinate":[507,300],"meta":{"width":90,"height":72,"id":"kkcm","label":"开客舱门","disabled":false}},{"id":"qjks","width":90,"height":72,"coordinate":[577,185],"meta":{"width":90,"height":72,"id":"qjks","label":"清洁开始","disabled":false}},{"id":"qjjs","width":90,"height":72,"coordinate":[737,185],"meta":{"width":90,"height":72,"id":"qjjs","label":"清洁结束","disabled":false}},{"id":"jwfx","width":90,"height":72,"coordinate":[737,92],"meta":{"width":90,"height":72,"id":"jwfx","label":"机务放行","disabled":false}},{"id":"pcks","width":90,"height":72,"coordinate":[577,402],"meta":{"width":90,"height":72,"id":"pcks","label":"配餐开始","disabled":false}},{"id":"pcjs","width":90,"height":72,"coordinate":[737,402],"meta":{"width":90,"height":72,"id":"pcjs","label":"配餐结束","disabled":false}},{"id":"djks","width":90,"height":72,"coordinate":[813,300],"meta":{"width":90,"height":72,"id":"djks","label":"登机开始","disabled":false}},{"id":"ksjy","width":90,"height":72,"coordinate":[577,512],"meta":{"width":90,"height":72,"id":"ksjy","label":"开始加油","disabled":false}},{"id":"jyjs","width":90,"height":72,"coordinate":[737,512],"meta":{"width":90,"height":72,"id":"jyjs","label":"加油结束","disabled":false}},{"id":"khcm","width":90,"height":72,"coordinate":[348,627],"meta":{"width":90,"height":72,"id":"khcm","label":"开货舱门","disabled":false}},{"id":"zjks","width":90,"height":72,"coordinate":[737,627],"meta":{"width":90,"height":72,"id":"zjks","label":"装机开始","disabled":false}},{"id":"djjs","width":90,"height":72,"coordinate":[961,300],"meta":{"width":90,"height":72,"id":"djjs","label":"登机结束","disabled":false}},{"id":"gkcm","width":90,"height":72,"coordinate":[1114,300],"meta":{"width":90,"height":72,"id":"gkcm","label":"关客舱门","disabled":false}},{"id":"qtcl","width":90,"height":72,"coordinate":[1270,300],"meta":{"width":90,"height":72,"id":"qtcl","label":"桥/梯撤离","disabled":false}},{"id":"clqz","width":90,"height":72,"coordinate":[1270,185],"meta":{"width":90,"height":72,"id":"clqz","label":"撤离桥载","disabled":false}},{"id":"zjjs","width":90,"height":72,"coordinate":[1041,627],"meta":{"width":90,"height":72,"id":"zjjs","label":"装机结束","disabled":false}},{"id":"ghcm","width":90,"height":72,"coordinate":[1270,627],"meta":{"width":90,"height":72,"id":"ghcm","label":"关货舱门","disabled":false}},{"id":"tyfx","width":90,"height":72,"coordinate":[1513,91],"meta":{"width":90,"height":72,"id":"tyfx","label":"同意放行","disabled":false}},{"id":"sqkc","width":90,"height":72,"coordinate":[1673,91],"meta":{"width":90,"height":72,"id":"sqkc","label":"申请开车","disabled":false}},{"id":"cld","width":90,"height":72,"coordinate":[1673,300],"meta":{"width":90,"height":72,"id":"cld","label":"撤轮挡","disabled":false}},{"id":"jwcbjs","width":90,"height":72,"coordinate":[1610,436],"meta":{"width":90,"height":72,"id":"jwcbjs","label":"机位除冰结束","disabled":false}},{"id":"jwcbks","width":90,"height":72,"coordinate":[1470,436],"meta":{"width":90,"height":72,"id":"jwcbks","label":"机位除冰开始","disabled":false}},{"id":"qf","width":90,"height":72,"coordinate":[1828,300],"meta":{"width":90,"height":72,"id":"qf","label":"起飞","disabled":false}},{"id":"end","width":90,"height":72,"coordinate":[1984,300],"meta":{"width":90,"height":72,"id":"end","label":"结束","disabled":false}},{"id":"djqz","width":90,"height":72,"coordinate":[422,185],"meta":{"width":90,"height":72,"id":"djqz","label":"对接桥载","disabled":false}},{"id":"sqfx","width":90,"height":72,"coordinate":[1331,91],"meta":{"width":90,"height":72,"id":"sqfx","label":"申请放行","disabled":false}},{"id":"tykc","width":90,"height":72,"coordinate":[1673,197],"meta":{"width":90,"height":72,"id":"tykc","label":"同意开车","disabled":false}}]'
        },
        //停场
        {
          linkList:
            '[{"id":"linkEaJTJ3zlh2ki5Alx","startId":"start","endId":"qzqf","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link1gHv1hVP1znpyL51","startId":"qzqf","endId":"ldgx","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkJyixvcOCfAPyi2Aq","startId":"ld","endId":"dld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkaGYwIXUYghMG6H8N","startId":"qtdj","endId":"djqz","startAt":[45,0],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkWReBdJs0WBquPw2C","startId":"qtdj","endId":"kkcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkBLWU36umn61SYRy8","startId":"dld","endId":"qtdj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link8sTJcDmUNcvweZd7","startId":"zhjj","endId":"ld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link5Usjyo5OSZR6ClXN","startId":"kkcm","endId":"xkjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link5Q7wjLjpgfELOmZP","startId":"ldgx","endId":"zhjj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link1lYND8F7Vl5WIX6y","startId":"qjks","endId":"qjjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkPo5zasFsqGwPQesE","startId":"qjjs","endId":"gkcm","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkhNbOwqMhl6tqMs3T","startId":"khcm","endId":"xjks","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkKx9rFQOlFywOKiIT","startId":"xjks","endId":"xjjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkE4CSGRzC7irtrnFs","startId":"gkcm","endId":"qtcl","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkvaRTXr50JEfxWQlK","startId":"qtcl","endId":"clqz","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link0eyosRqmfwztsoyu","startId":"xkjs","endId":"pcks","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkB1TPcKxHit4wWX5J","startId":"qtcl","endId":"hwjj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkJZ76f7bXtVY3Yo0g","startId":"hwjj","endId":"end","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkR4voHXWRtrG85YPp","startId":"xjjs","endId":"ghcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkURu6tNvTeDOP8Lsv","startId":"dld","endId":"khcm","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link1ClRO6xn5idkRHEn","startId":"xkjs","endId":"qjks","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkP53lFw9frHKBUvtD","startId":"ghcm","endId":"hwjj","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkQYLC4Bvp814t15Sb","startId":"pcks","endId":"pcjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link0W8yB208y5r3p1Z9","startId":"pcjs","endId":"gkcm","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}}]',
          nodeList:
            '[{"id":"start","width":90,"height":72,"coordinate":[35,299],"meta":{"width":90,"height":72,"id":"start","label":"开始"}},{"id":"qzqf","width":90,"height":72,"coordinate":[185,299],"meta":{"width":90,"height":72,"id":"qzqf","label":"前站起飞"}},{"id":"ldgx","width":90,"height":72,"coordinate":[328,299],"meta":{"width":90,"height":72,"id":"ldgx","label":"雷达更新"}},{"id":"zhjj","width":90,"height":72,"coordinate":[468,299],"meta":{"width":90,"height":72,"id":"zhjj","label":"最后进近"}},{"id":"ld","width":90,"height":72,"coordinate":[605,299],"meta":{"width":90,"height":72,"id":"ld","label":"落地"}},{"id":"dld","width":90,"height":72,"coordinate":[748,299],"meta":{"width":90,"height":72,"id":"dld","label":"挡轮挡","disabled":false}},{"id":"qtdj","width":90,"height":72,"coordinate":[892,299],"meta":{"width":90,"height":72,"id":"qtdj","label":"桥/梯对接","disabled":false}},{"id":"djqz","width":90,"height":72,"coordinate":[892,179],"meta":{"width":90,"height":72,"id":"djqz","label":"对接桥载","disabled":false}},{"id":"kkcm","width":90,"height":72,"coordinate":[1032,299],"meta":{"width":90,"height":72,"id":"kkcm","label":"开客舱门","disabled":false}},{"id":"xkjs","width":90,"height":72,"coordinate":[1186,299],"meta":{"width":90,"height":72,"id":"xkjs","label":"下客结束","disabled":false}},{"id":"qjks","width":90,"height":72,"coordinate":[1271,194],"meta":{"width":90,"height":72,"id":"qjks","label":"清洁开始","disabled":false}},{"id":"qjjs","width":90,"height":72,"coordinate":[1425,194],"meta":{"width":90,"height":72,"id":"qjjs","label":"清洁结束","disabled":false}},{"id":"gkcm","width":90,"height":72,"coordinate":[1503,299],"meta":{"width":90,"height":72,"id":"gkcm","label":"关客舱门","disabled":false}},{"id":"xjks","width":90,"height":72,"coordinate":[1124,512],"meta":{"width":90,"height":72,"id":"xjks","label":"卸机开始","disabled":false}},{"id":"khcm","width":90,"height":72,"coordinate":[892,512],"meta":{"width":90,"height":72,"id":"khcm","label":"开货舱门","disabled":false}},{"id":"xjjs","width":90,"height":72,"coordinate":[1425,512],"meta":{"width":90,"height":72,"id":"xjjs","label":"卸机结束","disabled":false}},{"id":"qtcl","width":90,"height":72,"coordinate":[1648,299],"meta":{"width":90,"height":72,"id":"qtcl","label":"桥/梯撤离","disabled":false}},{"id":"clqz","width":90,"height":72,"coordinate":[1783,201],"meta":{"width":90,"height":72,"id":"clqz","label":"撤离桥载","disabled":false}},{"id":"hwjj","width":90,"height":72,"coordinate":[1783,299],"meta":{"width":90,"height":72,"id":"hwjj","label":"护卫交接","disabled":false}},{"id":"end","width":90,"height":72,"coordinate":[1944,299],"meta":{"width":90,"height":72,"id":"end","label":"结束","disabled":false}},{"id":"ghcm","width":90,"height":72,"coordinate":[1648,512],"meta":{"width":90,"height":72,"id":"ghcm","label":"关货舱门","disabled":false}},{"id":"pcks","width":90,"height":72,"coordinate":[1271,420],"meta":{"width":90,"height":72,"id":"pcks","label":"配餐开始","disabled":false}},{"id":"pcjs","width":90,"height":72,"coordinate":[1425,420],"meta":{"width":90,"height":72,"id":"pcjs","label":"配餐结束","disabled":false}}]'
        },
        // 过站
        {
          linkList:
            '[{"id":"linkTGA97UWSwHl6kq7d","startId":"ghcm","endId":"qtcl","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkq7dq6k0pU6POBfcG","startId":"dld","endId":"qtdj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkHp4o6M6cjO6qzkSj","startId":"qtcl","endId":"cld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkP3vGlz26Hnfrgmqr","startId":"cld","endId":"qwcl","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkcTJ5AAQ9TRx3j2dM","startId":"qwcl","endId":"hkqtc","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkvrXapohreRQjPmEu","startId":"jhcl","endId":"hkqtc","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkArx9lJx60adI2EMj","startId":"ksjqs","endId":"wcjqs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkHeljGwQy5zTNb13h","startId":"qf","endId":"end","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkRoVGYpsoedIBRtRJ","startId":"qzqf","endId":"ld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link5TM8oMfHdRayDB6k","startId":"pcks","endId":"pcjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkZhNfvwigPsq3PhMA","startId":"qtdj","endId":"khcm","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linksCZT1V06NM4t1A5h","startId":"wcbj","endId":"qtcl","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkwjt9D8yCAgKo8ktY","startId":"lghbdmyj","endId":"qf","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"link9lxs1AQekwBNRSD6","startId":"cld","endId":"hkqtc","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkpcJEu4zwrPkbHbCf","startId":"wcjqs","endId":"qtcl","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"link0bl0RQh08O5tudHX","startId":"hkqrw","endId":"dld","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkYlcWFoa8gHeLntnX","startId":"ld","endId":"dghbdmyj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkaieGKLHO6H3yQ8Hv","startId":"start","endId":"qzqf","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkwrIT0hZcThF4R1Ky","startId":"jhdw","endId":"hkqrw","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkh4EN7gw7i6B2RvT2","startId":"qwdw","endId":"hkqrw","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"link8qay9nLx8i3xPBsP","startId":"hyxlzz","endId":"ghcm","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkJQxCJSjlyOdJdClG","startId":"hyxlxz","endId":"hyxlzz","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkAHEJD77xY9fe3q6y","startId":"khcm","endId":"hyxlxz","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkrbMNl829FfCFbdX2","startId":"qtdj","endId":"jzdw","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkWUnYBT5pgTycKmab","startId":"kkcm","endId":"ksxk","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkzKQxXHkSl5igZOdH","startId":"ksxk","endId":"xkjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkW1yCxuIYVi8Iaeyh","startId":"xkjs","endId":"djks","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linksZOC06nBC4a7dTGu","startId":"djks","endId":"djjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkYFGoERnQzoL85fWE","startId":"qtdj","endId":"kkcm","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkoVkujF1fvp66hVTz","startId":"dghbdmyj","endId":"hkqrw","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkBaK0nYpymqhuRTvG","startId":"qtdj","endId":"ksbj","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkzqaioKjSCsvS4qL9","startId":"qtdj","endId":"kspw","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkEvwgwKwqcvY8YTNz","startId":"qtdj","endId":"ksjqs","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkOah9KTCQJNDaHLYr","startId":"qtdj","endId":"pcks","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkdndyaESI7ID3MQoW","startId":"dghbdmyj","endId":"jhdw","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkHFpzUuC1Z2iBO1zv","startId":"ld","endId":"fbmbcldsj","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkhVEI7kHKpjuYff11","startId":"qtdj","endId":"ksjy","startAt":[45,72],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkVz90Hc4gYdB6CJuS","startId":"jwfx","endId":"qtcl","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkzUQZUoGKN1xXhSsu","startId":"ksjy","endId":"jyjs","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkoDeEN6mUsQKky6Oj","startId":"fbmbcldsj","endId":"fbmbxkkcsj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkJI8iM7naGW5NLG1a","startId":"djjs","endId":"qtcl","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkjlIjihcOa82zpx2H","startId":"wcpw","endId":"qtcl","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linknSwleSCj6LNQIjhR","startId":"pcjs","endId":"qtcl","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkteq5WOzCYWzmpggt","startId":"cld","endId":"jhcl","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkQI2LlL8ALLU0SjJX","startId":"fbmbxkkcsj","endId":"hkqtc","startAt":[90,36],"endAt":[45,0],"meta":{"desc":0,"error":false}},{"id":"linkpg9wahMg1YoLjScJ","startId":"hkqtc","endId":"lghbdmyj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkKInUzABeEW4SyYKH","startId":"jyjs","endId":"qtcl","startAt":[90,36],"endAt":[45,72],"meta":{"desc":0,"error":false}},{"id":"linkBEojGv2ovbsNxdyY","startId":"dghbdmyj","endId":"qwdw","startAt":[45,0],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkfwDXleQNkz5smj4X","startId":"kspw","endId":"wcpw","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linklfKHVvc0OMoirR3Z","startId":"ksbj","endId":"wcbj","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}},{"id":"linkc59ObdjCiaGJFdmo","startId":"jzdw","endId":"jwfx","startAt":[90,36],"endAt":[0,36],"meta":{"desc":0,"error":false}}]',
          nodeList:
            '[{"id":"ksjy","width":90,"height":72,"coordinate":[1286,701],"meta":{"width":90,"height":72,"id":"ksjy","label":"开始加油"}},{"id":"jyjs","width":90,"height":72,"coordinate":[1530,701],"meta":{"width":90,"height":72,"id":"jyjs","label":"加油结束","disabled":false}},{"id":"pcks","width":90,"height":72,"coordinate":[1286,614],"meta":{"width":90,"height":72,"id":"pcks","label":"配餐开始"}},{"id":"pcjs","width":90,"height":72,"coordinate":[1530,614],"meta":{"width":90,"height":72,"id":"pcjs","label":"配餐结束"}},{"id":"ksjqs","width":90,"height":72,"coordinate":[1286,529],"meta":{"width":90,"height":72,"id":"ksjqs","label":"开始加清水"}},{"id":"wcjqs","width":90,"height":72,"coordinate":[1530,529],"meta":{"width":90,"height":72,"id":"wcjqs","label":"完成加清水"}},{"id":"kspw","width":90,"height":72,"coordinate":[1286,446],"meta":{"width":90,"height":72,"id":"kspw","label":"开始排污"}},{"id":"wcpw","width":90,"height":72,"coordinate":[1530,446],"meta":{"width":90,"height":72,"id":"wcpw","label":"完成排污"}},{"id":"ksbj","width":90,"height":72,"coordinate":[1286,365],"meta":{"width":90,"height":72,"id":"ksbj","label":"开始保洁"}},{"id":"wcbj","width":90,"height":72,"coordinate":[1530,365],"meta":{"width":90,"height":72,"id":"wcbj","label":"完成保洁"}},{"id":"jzdw","width":90,"height":72,"coordinate":[1286,279],"meta":{"width":90,"height":72,"id":"jzdw","label":"机组到位"}},{"id":"jwfx","width":90,"height":72,"coordinate":[1530,279],"meta":{"width":90,"height":72,"id":"jwfx","label":"机务放行"}},{"id":"qtcl","width":90,"height":72,"coordinate":[1860,279],"meta":{"width":90,"height":72,"id":"qtcl","label":"桥/梯撤离"}},{"id":"cld","width":90,"height":72,"coordinate":[1997,279],"meta":{"width":90,"height":72,"id":"cld","label":"撤轮挡"}},{"id":"hkqtc","width":90,"height":72,"coordinate":[2139,279],"meta":{"width":90,"height":72,"id":"hkqtc","label":"航空器推出"}},{"id":"lghbdmyj","width":90,"height":72,"coordinate":[2287,279],"meta":{"width":90,"height":72,"id":"lghbdmyj","label":"离港航班地面移交"}},{"id":"qf","width":90,"height":72,"coordinate":[2435,279],"meta":{"width":90,"height":72,"id":"qf","label":"起飞"}},{"id":"end","width":90,"height":72,"coordinate":[2567,279],"meta":{"width":90,"height":72,"id":"end","label":"结束"}},{"id":"qwcl","width":90,"height":72,"coordinate":[2074,188],"meta":{"width":90,"height":72,"id":"qwcl","label":"勤务撤离"}},{"id":"jhcl","width":90,"height":72,"coordinate":[2074,96],"meta":{"width":90,"height":72,"id":"jhcl","label":"监护撤离"}},{"id":"qtdj","width":90,"height":72,"coordinate":[993,279],"meta":{"width":90,"height":72,"id":"qtdj","label":"桥/梯对接"}},{"id":"dld","width":90,"height":72,"coordinate":[863,279],"meta":{"width":90,"height":72,"id":"dld","label":"挡轮挡"}},{"id":"hkqrw","width":90,"height":72,"coordinate":[735,279],"meta":{"width":90,"height":72,"id":"hkqrw","label":"航空器入位"}},{"id":"dghbdmyj","width":90,"height":72,"coordinate":[452,279],"meta":{"width":90,"height":72,"id":"dghbdmyj","label":"到港航班地面移交","editVisible":false}},{"id":"ld","width":90,"height":72,"coordinate":[328,279],"meta":{"width":90,"height":72,"id":"ld","label":"落地"}},{"id":"qzqf","width":90,"height":72,"coordinate":[194,279],"meta":{"width":90,"height":72,"id":"qzqf","label":"前站起飞"}},{"id":"start","width":90,"height":72,"coordinate":[56,279],"meta":{"width":90,"height":72,"id":"start","label":"开始"}},{"id":"ghcm","width":90,"height":72,"coordinate":[1691,188],"meta":{"width":90,"height":72,"id":"ghcm","label":"关货舱门"}},{"id":"hyxlzz","width":90,"height":72,"coordinate":[1484,188],"meta":{"width":90,"height":72,"id":"hyxlzz","label":"货邮行李装载"}},{"id":"hyxlxz","width":90,"height":72,"coordinate":[1301,188],"meta":{"width":90,"height":72,"id":"hyxlxz","label":"货邮行李卸载"}},{"id":"khcm","width":90,"height":72,"coordinate":[1133,188],"meta":{"width":90,"height":72,"id":"khcm","label":"开货舱门"}},{"id":"kkcm","width":90,"height":72,"coordinate":[1133,96],"meta":{"width":90,"height":72,"id":"kkcm","label":"开客舱门"}},{"id":"ksxk","width":90,"height":72,"coordinate":[1301,96],"meta":{"width":90,"height":72,"id":"ksxk","label":"开始下客"}},{"id":"xkjs","width":90,"height":72,"coordinate":[1430,96],"meta":{"width":90,"height":72,"id":"xkjs","label":"下客结束"}},{"id":"djks","width":90,"height":72,"coordinate":[1554,96],"meta":{"width":90,"height":72,"id":"djks","label":"登机开始"}},{"id":"djjs","width":90,"height":72,"coordinate":[1678,96],"meta":{"width":90,"height":72,"id":"djjs","label":"登机结束"}},{"id":"qwdw","width":90,"height":72,"coordinate":[594,188],"meta":{"width":90,"height":72,"id":"qwdw","label":"勤务到位"}},{"id":"jhdw","width":90,"height":72,"coordinate":[594,96],"meta":{"width":90,"height":72,"id":"jhdw","label":"监护到位"}},{"id":"fbmbcldsj","width":90,"height":72,"coordinate":[821,18],"meta":{"width":90,"height":72,"id":"fbmbcldsj","label":"发布目标撤轮挡时间","disabled":false}},{"id":"fbmbxkkcsj","width":90,"height":72,"coordinate":[1920,18],"meta":{"width":90,"height":72,"id":"fbmbxkkcsj","label":"发布目标许可开车时间","disabled":false}}]'
        }
      ],
      nodeMenu: [
        [
          {
            label: '删除',
            selected: this.removeNode
          }
        ]
      ],
      linkMenuList: [
        [
          {
            label: '删除',
            disable: false,
            selected: link => link.remove()
          }
        ],
        [
          {
            label: '编辑',
            disable: false,
            selected: this.setLinkDesc
          }
        ]
      ],
      linkBaseStyle: {
        color: '#5959FF', // line 颜色
        hover: 'red', // line hover 的颜色
        textColor: '#fff', // line 描述文字颜色
        textHover: '#fff', // line 描述文字 hover 颜色
        font: '12px Arial ', // line 描述文字 字体设置 参考 canvas font
        dotted: false, // 是否是虚线
        lineDash: [4, 4], // 虚线时生效
        background: '#5959FF' // 描述文字背景色
      },
      form: {},
      formLabelWidth: '80px',
      visible: false,
      editVisible: false,
      position: {
        x: 0,
        y: 0
      },
      rightClickNode: null,
      flowForm: {
        type: 1,
        duration: '60'
      },
      processNodeRelationArray: [],
      nodeRelationArray: [],
      maxTotal: 'a'
    };
  },
  methods: {
    removeNode(node) {
      node.remove();
      this.$set(_.find(this.basicNodeList, { id: node.id }), 'disabled', false);
    },
    handleNodeClick(id) {
      this.activeNodeId = id;
    },
    setLinkDesc(link) {
      link.meta.desc = prompt('') || 0;
    },
    onDragend(e, item) {
      const node = this.$refs.superFlow.addNodeIfNeed(e, {
        ...basicNodeInfo,
        ...item
      });

      if (node) {
        this.handleNodeClick(item.id);
        this.$set(item, 'disabled', true);
      }
    },
    addTemplate(list) {
      const nodes = list.map(x => ({ ...basicNodeInfo, ...x }));
      this.$refs.superFlow.addTemplate(nodes);
      this.basicNodeList.forEach(e => {
        this.$set(e, 'disabled', false);
        const node = list.find(n => n.id == e.id);
        if (node) {
          this.$set(e, 'disabled', true);
        }
      });
    },
    addNode() {
      this.basicNodeList.splice(this.basicNodeList.length - 1, 0, this.form);
      this.visible = false;
      this.form = {};
    },
    showOperate(e, item) {
      this.position = {
        x: e.x,
        y: e.y
      };
      this.rightClickNode = item;
    },
    deleteNode() {
      this.basicNodeList = this.basicNodeList.filter(e => e.id !== this.rightClickNode.id);
      this.position.x = 0;
    },
    editNode() {
      this.basicNodeList.forEach(e => {
        this.$set(e, 'editVisible', false);
      });
      this.rightClickNode.editVisible = !this.rightClickNode.editVisible;
      this.position.x = 0;
      this.form = _.cloneDeep(this.rightClickNode);
    },
    updateNode() {
      this.rightClickNode.editVisible = !this.rightClickNode.editVisible;
      this.$set(this.rightClickNode, 'label', this.form.label);
    },
    handleClose() {
      this.position.x = 0;
      if (this.rightClickNode) {
        this.rightClickNode.editVisible = false;
      }
    },
    changeType() {
      const { type } = this.flowForm;
      this.processNodeRelationArray = JSON.parse(this.aList[type - 1].nodeList);
      this.nodeRelationArray = JSON.parse(this.aList[type - 1].linkList);
      this.maxTotal = type == 3 ? 60 : 'a';
      this.basicNodeList.forEach(e => {
        this.$set(e, 'disabled', false);
        const node = this.processNodeRelationArray.find(n => n.id == e.id);
        if (node) {
          this.$set(e, 'disabled', true);
        }
      });
    },
    changeDuration(val) {
      this.maxTotal = val;
    },
    changeRange(val) {
      if (val.length == 3) {
        val.pop();
        this.range = val;
        this.$message.warning('最多选两个节点');
      }
    },
    submit() {
      const { linkList, nodeList } = this.$refs.superFlow.graph;
      console.log(JSON.stringify(linkList));
      console.log(JSON.stringify(nodeList));
    }
  },
  created() {
    this.changeType();
  }
};
</script>

<style lang="less">
.ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
}

.node-item {
  button {
    width: 100%;
    height: 40px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #dedede;
    padding: 0 16px;
    margin-bottom: 12px;
    cursor: move;

    &.disabled {
      cursor: not-allowed;
      background: #e6e6e6;
    }
  }
}

.plus-button {
  width: 100%;
  height: 40px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #dedede;
  padding: 0 16px;
  cursor: pointer;
}

.operate-panel {
  width: 128px;
  background: #fff;
  box-shadow: 0 4px 16px 0 rgb(4 0 0 / 12%);
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 10px 0;

  > div {
    cursor: pointer;
  }
}

.link-base-style-form {
  .el-form-item {
    margin-bottom: 12px;
  }

  padding-bottom: 20px;
  border-bottom: 1px solid #dcdcdc;
}

.super-flow-demo1 {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  @list-width: 200px;
  @form-width: 300px;

  > .node-container {
    padding: 20px;
    width: @list-width;
    height: 100%;
    text-align: center;
    background-color: #fff;
    overflow: auto;
  }

  > .flow-container {
    flex: 1;
    overflow: auto;
    position: relative;
  }

  > .form-container {
    padding: 20px 10px;
    width: @form-width;
    height: 100%;
    text-align: center;
    background-color: #fff;
  }

  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .super-flow__node {
    border: none;

    .flow-node {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      font-size: 12px;
      text-align: center;

      > div:first-child {
        height: 21px;
      }

      > div:nth-child(2) {
        height: 30px;
        line-height: 30px;
        background: #aaa;
        color: #fff;
      }
    }

    .active {
      border: 2px dashed blue;
    }
  }

  .super-flow__line .text {
    padding: 0 4px;
    transform: none;
    background: none !important;
    color: #000 !important;
  }

  .el-card {
    margin-bottom: 20px;
  }

  .el-card__header {
    padding: 5px;
    text-align: left;
  }

  .el-card__body {
    padding: 10px;
  }
}
</style>
