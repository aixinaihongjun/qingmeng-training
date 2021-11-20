<template>
  <div class="dashboard-outer">
    <UpperTitle title="发布任务" text="请仔细填写您的任务需求，需求越详细，越有利用开发者了解您的任务，从而精准的评估您的任务。"></UpperTitle>
    <div class="row">
      <div class="col-lg-12">
        <div class="ui-item justify-content-center">
          <div class="qm-step">
            <el-steps :active="stepActive">
              <el-step title="填写需求" icon="el-icon-edit"></el-step>
              <el-step title="确认信息" icon="el-icon-upload"></el-step>
            </el-steps>
          </div>
        </div>
      </div>
      <div v-if="stepActive === 1" class="col-lg-12">
        <div class="qm-widget">
          <div class="qm-widget-content">
            <div class="default-form">
              <!-- 输入任务名称 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectName.$error }">
                <label class="col-sm-2 col-form-label" for="projectName">任务名称</label>
                <div class="col-sm-9">
                  <input id="projectName" class="form__input" type="text" v-model.trim="$v.project.projectName.$model" />
                  <!--这里是判断表格输入的合法性-->
                  <div class="error" v-if="!$v.project.projectName.required">请输入任务名</div>
                </div>
              </div>
              <!-- 选择任务类型 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectTypeIdList.$error }">
                <label class="col-sm-2 col-form-label">任务类型(可多选)</label>
                <div class="col-sm-9 form__input__box">
                  <div class="form-check form-check-inline checkboxes square" v-for="item in projectTypeData" :key="item.typeName">
                    <input :id="item.typeName" class="form-check-input" type="checkbox" v-model="$v.project.projectTypeIdList.$model" :value="item">
                    <label class="form-check-label" :for="item.typeName">{{ item.typeName }}</label>
                  </div>
                  <div class="error" v-if="!$v.project.projectTypeIdList.required">请选择任务类型</div>
                  <div class="error" v-if="!$v.project.projectTypeIdList.minLength">至少选择1项</div>
                </div>
              </div>
              <!--交付周期-->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectDuration.$error }">
                <label class="col-sm-2 col-form-label">交付周期</label>
                <div class="col-sm-9">
                  <input id="projectDuration" type="text" v-model="$v.project.projectDuration.$model" />
                  <div class="error" v-if="!$v.project.projectDuration.required">请输入预计任务周期(天)</div>
                  <div class="error" v-if="!$v.project.projectDuration.minValue">
                    至少需要 {{ $v.project.projectDuration.$params.minValue.min }} 天，且为纯数字
                  </div>
                </div>
                <div class="col-sm-1 text-muted">天</div>
              </div>
              <!-- 输入任务预算 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectBudget.$error }">
                <label class="col-sm-2 col-form-label">任务预算</label>
                <div class="col-sm-9">
                  <input id="projectBudget" type="text" name="name" v-model="$v.project.projectBudget.$model" />
                  <div class="error" v-if="!$v.project.projectBudget.required">请输入任务预算</div>
                  <div class="error" v-if="!$v.project.projectBudget.minValue">至少输入
                    {{ $v.project.projectBudget.$params.minValue.min }} 元，且为纯数字
                  </div>
                </div>
                <div class="col-sm-1 text-muted">元</div>
              </div>
              <!-- 任务简介 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectShortIntro.$error }">
                <label class="col-sm-2 col-form-label">任务简介</label>
                <div class="col-sm-9">
                  <textarea id="projectShortIntro" v-model="$v.project.projectShortIntro.$model" style="height: 120px;"></textarea>
                  <small class="form-text text-muted">
                    200字内，任务简介会出现在任务列表中，方便开发者用最快的时间了解您的任务概况。
                  </small>
                  <div class="error" v-if="!$v.project.projectShortIntro.required">请描述下您的任务</div>
                </div>
              </div>
              <!-- 任务介绍 （富文本编辑器）-->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.projectIntroduction.$error }">
                <label class="col-sm-2 col-form-label">详细介绍</label>
                <div class="col-sm-9">
                  <tinymce v-model="$v.project.projectIntroduction.$model" menubar="false" :height="300" />
                  <small class="form-text text-muted">
                    请仔细填写您的任务需求，需求越详细，越有利用开发了解您的任务，从而精准的评估您的任务。
                  </small>
                  <div class="error" v-if="!$v.project.projectIntroduction.required">请描述下您的任务</div>
                </div>
              </div>
              <!-- 相关文档 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">相关文档</label>
                <div class="col-sm-9">
                  <file-upload :action="getAbsPath('project/uploadFile')" :showFileList="project.fileList" @on-success="handleSuccess" @on-remove="handleRemove"></file-upload>
                  <small class="form-text text-muted">文档后期还可以修改。</small>
                </div>
              </div>
              <!--招募-->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.engineerTypeIdList.$error }">
                <label class="col-sm-2 col-form-label">招募(可多选)</label>
                <div class="col-sm-9">
                  <div class="form-check form-check-inline checkboxes square" v-for="item in engineerTypeData" :key="item.positionName">
                    <input :id="item.positionName" class="form-check-input" type="checkbox" v-model="$v.project.engineerTypeIdList.$model" :value="item">
                    <label class="form-check-label" :for="item.positionName">{{ item.positionName }}</label>
                  </div>
                  <div class="error" v-if="!$v.project.engineerTypeIdList.required">请选择职位类型</div>
                  <div class="error" v-if="!$v.project.engineerTypeIdList.minLength">至少选择1项</div>
                </div>
              </div>
              <!-- 工作方式 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.workType.$error }">
                <label class="col-sm-2 col-form-label">工作方式</label>
                <div class="col-sm-9">
                  <div class="form-check form-check-inline radio-box" v-for="way in workWay" :key="way.id">
                    <input class="form-check-input" type="radio" name="workWay" :id="way.name" v-model="$v.project.workType.$model" :value="way" :checked="way.checked" />
                    <label class="form-check-label" :for="way.name">{{ way.name }}</label>
                  </div>
                  <div class="error" v-if="!$v.project.workType.required">请选工作方式</div>
                </div>
              </div>
              <!--工作内容-->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">工作内容</label>
                <div class="col-sm-9">
                  <tinymce v-model="project.workExplain" menubar="false" :height="100" />
                  <small class="form-text text-muted">
                    您对开发者的工作内容要求。
                  </small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-2 col-form-label"></div>
                <div class="col-sm-9">
                  <button type="button" class="theme-btn btn-style-one" @click="checkForm">下一步</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="stepActive === 2" class="col-lg-12">
        <div class="qm-widget">
          <div class="qm-widget-content">
            <div class="default-form">
              <!-- 输入任务名称 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label" for="projectName">任务名称</label>
                <div class="col-sm-9">
                    {{ project.projectName }}
                </div>
              </div>
              <!-- 选择任务类型 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">任务类型(可多选)</label>
                <div class="col-sm-9">
                  <span v-for="item in project.projectTypeIdList" :key="item.id">
                    {{ item.typeName }} &nbsp;&nbsp;
                  </span>
                </div>
              </div>
              <!--交付周期-->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">交付周期</label>
                <div class="col-sm-9">
                  天
                </div>
              </div>
              <!-- 输入任务预算 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">任务预算</label>
                <div class="col-sm-9">
                  元
                </div>
              </div>
              <!-- 任务简介 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">任务简介</label>
                <div class="col-sm-9">

                </div>
              </div>
              <!-- 任务介绍 （富文本编辑器）-->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">任务介绍</label>
                <div class="col-sm-9">
                  <!-- <div class="editor-content" v-html="project.projectIntroduction" /> -->
                </div>
              </div>
              <!-- 相关文档 -->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">相关文档</label>
                <div class="col-sm-9">
                  <!-- <p v-for="(item, index) in project.fileList" :key="index" class="mb-2">
                    <a target="_blank" :href="getAbsPath(item.fileUrl)">{{ item.fileName }} &nbsp;&nbsp;</a>
                  </p> -->
                </div>
              </div>
              <!--招募-->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">招募(可多选)</label>
                <div class="col-sm-9">
                  <span>
                     &nbsp;&nbsp;
                  </span>
                </div>
              </div>
              <!-- 工作方式 -->
              <div class="form-group row" :class="{ 'form-group--error': $v.project.workType.$error }">
                <label class="col-sm-2 col-form-label">工作方式</label>
                <div class="col-sm-9">

                </div>
              </div>
              <!--工作内容-->
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">工作内容</label>
                <div class="col-sm-9">
                  <div class="editor-content" v-html="project.workExplain" />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-2 col-form-label"></div>
                <div class="col-sm-9">
                  <button type="button" class="theme-btn btn-style-one mr-3">立即发布</button>
                  <button class="theme-btn btn-style-two" @click="stepActive = 1">上一步</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, minValue } from "vuelidate/lib/validators";
import UpperTitle from "../components/UpperTitle.vue";
import FileUpload from "@/components/FileUpload.vue";
import Tinymce from "@/components/Tinymce";

export default {
  name: "PublishTask",
  components: {
    UpperTitle,
    Tinymce,
    FileUpload,
  },

  data() {
    return {
      stepActive: 1, //步骤active状态
      projectTypeData: [], //任务类型
      engineerTypeData: [], //职位列表
      workWay: [
        //工作方式
        {
          id: 2,
          name: "全兼均可",
          checked: true,
        },
        {
          id: 0,
          name: "全职",
          checked: false,
        },
        {
          id: 1,
          name: "兼职",
          checked: false,
        },
      ],
      project: {
        projectName: "", //任务名称
        projectTypeIdList: [], //任务类型
        projectDuration: "", //交付周期
        projectBudget: "", //任务预算
        projectShortIntro: "", //任务简介
        projectIntroduction: "", //任务介绍
        fileList: [], //任务相关文档
        engineerTypeIdList: [], //招募
        workType: {}, //工作方式
        workExplain: "", //工作内容说明
        startTime: "2021-08-25 12:34:39", //开始时间
        endTime: "2021-08-25 12:34:39", //结束时间
        isCompanyPublish: 0,
      },
    };
  },
  validations: {
    project: {
      projectName: {
        required,
      },
      projectTypeIdList: {
        required,
        minLength: minLength(1),
      },
      projectDuration: {
        required,
        minValue: minValue(1),
      },
      projectBudget: {
        required,
        minValue: minValue(1),
      },
      projectShortIntro: {
        required,
      },
      projectIntroduction: {
        required,
      },
      engineerTypeIdList: {
        required,
        minLength: minLength(1),
      },
      workType: {
        required,
      },
    },
  },

  methods: {
    initData(){
      this.axios.post("/project/getProjectTypeList").then((res) => {
        this.projectTypeData = res;
      });

      this.axios.post("/project/getPositionTypeList").then((res) => {
        this.engineerTypeData = res;
      });
    },
    checkForm(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialogMsg = "发布失败了,请检查输入的信息是否正确！！";
        this.dialogMsgTitle = "警告";
      } else {
        this.stepActive = 2;
      }
    }
  },
  created() {
    this.initData()
  },
};
</script>

<style lang="scss" scoped>
.qm-widget-content {
  /deep/ .editor-content {
    p {
      color: #363636;
    }
  }

  .default-form {
    textarea {
      min-height: auto;
    }
  }
}

.error {
  color: #ff0000;
  font-size: 15px;
  display: none;
}

.qm-step {
  width: 60%;
}
</style>
