<template>
  <q-step
    :name="3"
    :title="$t('formStepBlockTitle')"
    icon="apartment"
    active-icon="apartment"
    :done="checkoutFormStore.isCompleted"
    :error="checkoutFormStore.errors.length > 0"
  >
    <q-form @submit="sendRequest" class="q-gutter-md">
      <q-input
        v-if="checkoutFormStore.constraints.totalMeters.show"
        filled
        icon="ballot"
        type="number"
        step="any"
        v-model="checkoutFormStore.inputs.totalMeters"
        :label="$t('formStepTotalMetersLabel')"
        :hint="$t('formStepTotalMetersHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.totalMeters.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="square_foot" />
        </template>
        <template v-slot:error>
          <div v-if="v$.totalMeters.$errors.length === 1">
            <span>
              {{ v$.totalMeters.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.totalMeters.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-input>

      <q-input
        v-if="checkoutFormStore.constraints.livingMeters.show"
        filled
        type="number"
        step="any"
        v-model="checkoutFormStore.inputs.livingMeters"
        :label="$t('formStepLivingMetersLabel')"
        :hint="$t('formStepLivingMetersHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.livingMeters.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="living" />
        </template>
        <template v-slot:error>
          <div v-if="v$.livingMeters.$errors.length === 1">
            <span>
              {{ v$.livingMeters.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.livingMeters.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-input>

      <q-input
        v-if="checkoutFormStore.constraints.kitchenMeters.show"
        filled
        type="number"
        step="any"
        v-model="checkoutFormStore.inputs.kitchenMeters"
        :label="$t('formStepKitchenMetersLabel')"
        :hint="$t('formStepKitchenMetersHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.kitchenMeters.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="kitchen" />
        </template>
        <template v-slot:error>
          <div v-if="v$.kitchenMeters.$errors.length === 1">
            <span>
              {{ v$.kitchenMeters.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.kitchenMeters.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-input>

      <q-input
        v-if="checkoutFormStore.constraints.areaSize.show"
        filled
        type="number"
        step="any"
        v-model="checkoutFormStore.inputs.areaSize"
        :label="$t('formStepAreaSizeLabel')"
        :hint="$t('formStepAreaSizeHint')"
        lazy-rules
        :bottom-slots="true"
        :error="v$.areaSize.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="kitchen" />
        </template>
        <template v-slot:error>
          <div v-if="v$.areaSize.$errors.length === 1">
            <span>
              {{ v$.areaSize.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.areaSize.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-input>

      <q-select
        v-if="checkoutFormStore.constraints.floorsCount.show"
        filled
        v-model="checkoutFormStore.inputs.floorsCount"
        use-chips
        :stack-label="true"
        :label="$t('formStepFloorsCountLabel')"
        :hint="$t('formStepFloorsCountHint')"
        :options="checkoutFormStore.options.floorsCount"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.floorsCount.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="domain" />
        </template>
        <template v-slot:error>
          <div v-if="v$.floorsCount.$errors.length === 1">
            <span>
              {{ v$.floorsCount.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.floorsCount.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>

      <q-select
        v-if="checkoutFormStore.constraints.floor.show"
        filled
        v-model="checkoutFormStore.inputs.floor"
        use-chips
        :stack-label="true"
        :label="$t('formStepFloorLabel')"
        :hint="$t('formStepFloorHint')"
        :options="checkoutFormStore.options.floor"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.floor.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="format_line_spacing" />
        </template>
        <template v-slot:error>
          <div v-if="v$.floor.$errors.length === 1">
            <span>
              {{ v$.floor.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.floor.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>

      <q-select
        v-if="checkoutFormStore.constraints.roomsCount.show"
        filled
        v-model="checkoutFormStore.inputs.roomsCount"
        use-chips
        :stack-label="true"
        :label="$t('formStepRoomsCountLabel')"
        :hint="$t('formStepRoomsCountHint')"
        :options="checkoutFormStore.options.roomsCount"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.roomsCount.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="meeting_room" />
        </template>
        <template v-slot:error>
          <div v-if="v$.roomsCount.$errors.length === 1">
            <span>
              {{ v$.roomsCount.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.roomsCount.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>

      <q-select
        v-if="checkoutFormStore.constraints.wallType.show"
        filled
        v-model="checkoutFormStore.inputs.wallType"
        use-chips
        :stack-label="true"
        :label="$t('formStepWallTypeLabel')"
        :hint="$t('formStepWallTypeHint')"
        :options="checkoutFormStore.options.wallType"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.wallType.$errors.length > 0"
      >
        <template v-slot:prepend>
          <q-icon name="house_siding" />
        </template>
        <template v-slot:error>
          <div v-if="v$.wallType.$errors.length === 1">
            <span>
              {{ v$.wallType.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.wallType.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>
      <q-toggle
        v-if="checkoutFormStore.constraints.hasParkingLot.show"
        v-model="checkoutFormStore.inputs.hasParkingLot"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      >
        <span style="color: rgba(0, 0, 0, 0.6); font-size: 14px">{{
          $t("formStepHasParkingLotLabel")
        }}</span>
      </q-toggle>
      <q-toggle
        v-if="checkoutFormStore.constraints.isTwoLevels.show"
        v-model="checkoutFormStore.inputs.isTwoLevels"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      >
        <span style="color: rgba(0, 0, 0, 0.6); font-size: 14px">{{
          $t("formStepIsTwoLevelsLabel")
        }}</span>
      </q-toggle>
      <q-toggle
        v-if="checkoutFormStore.constraints.isPenthouse.show"
        v-model="checkoutFormStore.inputs.isPenthouse"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      >
        <span style="color: rgba(0, 0, 0, 0.6); font-size: 14px">{{
          $t("formStepIsPenthouseLabel")
        }}</span>
      </q-toggle>
      <q-toggle
        v-if="checkoutFormStore.constraints.hasPanoramaWindows.show"
        v-model="checkoutFormStore.inputs.hasPanoramaWindows"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
      >
        <span style="color: rgba(0, 0, 0, 0.6); font-size: 14px">{{
          $t("formStepHasPanoramaWindowsLabel")
        }}</span>
      </q-toggle>
      <q-field
        v-if="checkoutFormStore.constraints.interiorRenovationClass.show"
        v-model="checkoutFormStore.inputs.interiorRenovationClass"
        borderless
        rounded
        :label="$t('formStepInteriorRenovationClassLabel')"
        :hint="$t('formStepInteriorRenovationClassHint')"
        :bottom-slots="true"
        :error="v$.interiorRenovationClass.$errors.length > 0"
      >
        <q-btn-toggle
          v-model="checkoutFormStore.inputs.interiorRenovationClass"
          dense
          spread
          no-caps
          stretch
          style="margin-top: 10px; margin-bottom: 10px"
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="checkoutFormStore.options.interiorRenovationClass"
        />
        <template v-slot:error>
          <div v-if="v$.interiorRenovationClass.$errors.length === 1">
            <span>
              {{ v$.interiorRenovationClass.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span
              v-for="error of v$.interiorRenovationClass.$errors"
              :key="error.$uid"
            >
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-field>

      <q-select
        v-if="checkoutFormStore.constraints.interiorNoRenovationType.show"
        v-show="
          checkoutFormStore.inputs.interiorRenovationClass === 'no_renovation'
        "
        filled
        v-model="checkoutFormStore.inputs.interiorNoRenovationType"
        use-chips
        :label="$t('formStepInteriorNoRenovationTypeLabel')"
        :hint="$t('formStepInteriorNoRenovationTypeHint')"
        :stack-label="true"
        :options="checkoutFormStore.options.interiorNoRenovationType"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.interiorNoRenovationType.$errors.length > 0"
        style="margin-top: 30px; margin-bottom: 20px"
      >
        <template v-slot:prepend>
          <q-icon name="other_houses" />
        </template>
        <template v-slot:error>
          <div v-if="v$.interiorNoRenovationType.$errors.length === 1">
            <span>
              {{ v$.interiorNoRenovationType.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span
              v-for="error of v$.interiorNoRenovationType.$errors"
              :key="error.$uid"
            >
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>
      <q-field
        stack-label
        hide-bottom-space
        v-if="checkoutFormStore.constraints.interiorPhotos.show"
        v-show="
          checkoutFormStore.inputs.interiorRenovationClass === 'has_renovation'
        "
        v-model="checkoutFormStore.inputs.interiorPhotos"
        borderless
        rounded
        :label="$t('formStepInteriorTypeLabel')"
        :hint="
          $t('formStepInteriorTypeHint', {
            min: checkoutFormStore.constraints.interiorPhotos.min,
            max: checkoutFormStore.constraints.interiorPhotos.max,
          })
        "
        :bottom-slots="true"
        :error="v$.interiorPhotos.$errors.length > 0"
        style="margin-top: 30px; margin-bottom: 20px"
      >
        <CustomUploader
          ref="interiorUploaderRef"
          multiple
          max-file-size="10485760"
          :max-files="checkoutFormStore.constraints.interiorPhotos.max"
          auto-upload
          :hide-upload-btn="true"
          :url="uploadUrlInterior"
          method="POST"
          :with-credentials="true"
          accept=".jpg, .png, .jpeg"
          @failed="interiorFailedHandler"
          @rejected="interiorRejectedHandler"
          @uploaded="interiorUploadedHandler"
          @stateInitialized="interiorUploaderMounted"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn
                v-if="scope.queuedFiles.length > 0"
                icon="clear_all"
                @click="scope.removeQueuedFiles"
                round
                dense
                flat
              >
                <q-tooltip>{{
                  $t("formStepUploaderCancelUploadingAll")
                }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.uploadedFiles.length > 0"
                icon="done_all"
                @click="scope.removeUploadedFiles"
                round
                dense
                flat
              >
                <q-tooltip>{{
                  $t("formStepUploaderRemoveUploadedAll")
                }}</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">
                  {{ $t("formStepUploadFiles") }}
                </div>
                <div class="q-uploader__subtitle">
                  {{ scope.uploadSizeLabel }} /
                  {{ scope.uploadProgressLabel }} [ {{ scope.files.length }} /
                  {{ checkoutFormStore.constraints.interiorPhotos.max }} ]
                </div>
              </div>
              <q-btn
                v-if="scope.canAddFiles"
                type="a"
                icon="add_box"
                round
                dense
                flat
              >
                <q-uploader-add-trigger />
                <q-tooltip>{{ $t("formStepUploadSelectFiles") }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canUpload"
                icon="cloud_upload"
                @click="scope.upload"
                round
                dense
                flat
              >
                <q-tooltip>{{ $t("formStepUploadSelectedFiles") }}</q-tooltip>
              </q-btn>

              <q-btn
                v-if="scope.isUploading"
                icon="clear"
                @click="scope.abort"
                round
                dense
                flat
              >
                <q-tooltip>{{ $t("formStepAbortUpload") }}</q-tooltip>
              </q-btn>
            </div>
          </template>
          <template v-slot:list="scope">
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section
                  :class="[
                    file.__status === 'failed' ? 'upload-file-failed' : '',
                  ]"
                >
                  <q-item-label
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                      'full-width',
                      'ellipsis',
                    ]"
                  >
                    {{ file.name }} {{ file.externalId }}
                  </q-item-label>

                  <q-item-label
                    caption
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                    ]"
                  >
                    {{ $t("formStepUploadFileStatus") }}:
                    {{ fileStatusTranslations(file.__status) }}
                  </q-item-label>

                  <q-item-label
                    caption
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                    ]"
                  >
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail>
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    :loading="file.isRemoveProcess"
                    @click="interiorRemoveFile(file, interiorUploaderRef)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </CustomUploader>
        <template v-slot:error>
          <div v-if="v$.interiorPhotos.$errors.length === 1">
            <span>
              {{ v$.interiorPhotos.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.interiorPhotos.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-field>
      <q-field
        v-if="checkoutFormStore.constraints.exteriorRenovationClass.show"
        v-model="checkoutFormStore.inputs.exteriorRenovationClass"
        borderless
        rounded
        :label="$t('formStepExteriorRenovationClassLabel')"
        :hint="$t('formStepExteriorRenovationClassHint')"
        :bottom-slots="true"
        :error="v$.exteriorRenovationClass.$errors.length > 0"
      >
        <q-btn-toggle
          v-model="checkoutFormStore.inputs.exteriorRenovationClass"
          dense
          spread
          no-caps
          stretch
          style="margin-top: 10px; margin-bottom: 10px"
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="checkoutFormStore.options.exteriorRenovationClass"
        />
        <template v-slot:error>
          <div v-if="v$.exteriorRenovationClass.$errors.length === 1">
            <span>
              {{ v$.exteriorRenovationClass.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span
              v-for="error of v$.exteriorRenovationClass.$errors"
              :key="error.$uid"
            >
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-field>

      <q-select
        v-if="checkoutFormStore.constraints.exteriorNoRenovationType.show"
        v-show="
          checkoutFormStore.inputs.exteriorRenovationClass ===
          'facade_without_renovation'
        "
        filled
        v-model="checkoutFormStore.inputs.exteriorNoRenovationType"
        use-chips
        :label="$t('formStepExteriorNoRenovationTypeLabel')"
        :hint="$t('formStepExteriorNoRenovationTypeHint')"
        :stack-label="true"
        :options="checkoutFormStore.options.exteriorNoRenovationType"
        :hide-hint="false"
        :bottom-slots="true"
        :error="v$.exteriorNoRenovationType.$errors.length > 0"
        style="margin-top: 30px; margin-bottom: 20px"
      >
        <template v-slot:prepend>
          <q-icon name="other_houses" />
        </template>
        <template v-slot:error>
          <div v-if="v$.exteriorNoRenovationType.$errors.length === 1">
            <span>
              {{ v$.exteriorNoRenovationType.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span
              v-for="error of v$.exteriorNoRenovationType.$errors"
              :key="error.$uid"
            >
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-select>
      <q-field
        stack-label
        hide-bottom-space
        v-if="checkoutFormStore.constraints.exteriorPhotos.show"
        v-show="
          checkoutFormStore.inputs.exteriorRenovationClass ===
          'renovated_facade'
        "
        v-model="checkoutFormStore.inputs.exteriorPhotos"
        borderless
        rounded
        :hint="
          $t('formStepExteriorTypeHint', {
            min: checkoutFormStore.constraints.exteriorPhotos.min,
            max: checkoutFormStore.constraints.exteriorPhotos.max,
          })
        "
        :label="$t('formStepExteriorTypeLabel')"
        :bottom-slots="true"
        :error="v$.exteriorPhotos.$errors.length > 0"
        style="margin-top: 30px; margin-bottom: 20px"
      >
        <CustomUploader
          ref="exteriorUploaderRef"
          multiple
          max-file-size="10485760"
          :max-files="checkoutFormStore.constraints.exteriorPhotos.max"
          auto-upload
          :hide-upload-btn="true"
          :url="uploadUrlExterior"
          method="POST"
          :with-credentials="true"
          accept=".jpg, .png, .jpeg"
          @failed="exteriorFailedHandler"
          @rejected="exteriorRejectedHandler"
          @uploaded="exteriorUploadedHandler"
          @stateInitialized="exteriorUploaderMounted"
        >
          <template v-slot:header="scope">
            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
              <q-btn
                v-if="scope.queuedFiles.length > 0"
                icon="clear_all"
                @click="scope.removeQueuedFiles"
                round
                dense
                flat
              >
                <q-tooltip>{{
                  $t("formStepUploaderCancelUploadingAll")
                }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.uploadedFiles.length > 0"
                icon="done_all"
                @click="scope.removeUploadedFiles"
                round
                dense
                flat
              >
                <q-tooltip>{{
                  $t("formStepUploaderRemoveUploadedAll")
                }}</q-tooltip>
              </q-btn>
              <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
              <div class="col">
                <div class="q-uploader__title">
                  {{ $t("formStepUploadFiles") }}
                </div>
                <div class="q-uploader__subtitle">
                  {{ scope.uploadSizeLabel }} /
                  {{ scope.uploadProgressLabel }} [ {{ scope.files.length }} /
                  {{ checkoutFormStore.constraints.exteriorPhotos.max }} ]
                </div>
              </div>
              <q-btn
                v-if="scope.canAddFiles"
                type="a"
                icon="add_box"
                round
                dense
                flat
              >
                <q-uploader-add-trigger />
                <q-tooltip>{{ $t("formStepUploadSelectFiles") }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="scope.canUpload"
                icon="cloud_upload"
                @click="scope.upload"
                round
                dense
                flat
              >
                <q-tooltip>{{ $t("formStepUploadSelectedFiles") }}</q-tooltip>
              </q-btn>

              <q-btn
                v-if="scope.isUploading"
                icon="clear"
                @click="scope.abort"
                round
                dense
                flat
              >
                <q-tooltip>{{ $t("formStepAbortUpload") }}</q-tooltip>
              </q-btn>
            </div>
          </template>
          <template v-slot:list="scope">
            <q-list separator>
              <q-item v-for="file in scope.files" :key="file.name">
                <q-item-section
                  :class="[
                    file.__status === 'failed' ? 'upload-file-failed' : '',
                  ]"
                >
                  <q-item-label
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                      'full-width',
                      'ellipsis',
                    ]"
                  >
                    {{ file.name }} {{ file.externalId }}
                  </q-item-label>

                  <q-item-label
                    caption
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                    ]"
                  >
                    {{ $t("formStepUploadFileStatus") }}:
                    {{ fileStatusTranslations(file.__status) }}
                  </q-item-label>

                  <q-item-label
                    caption
                    :class="[
                      file.__status === 'failed' ? 'upload-file-failed' : '',
                    ]"
                  >
                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                  </q-item-label>
                </q-item-section>

                <q-item-section v-if="file.__img" thumbnail>
                  <img :src="file.__img.src" />
                </q-item-section>

                <q-item-section top side>
                  <q-btn
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    :loading="file.isRemoveProcess"
                    @click="exteriorRemoveFile(file, exteriorUploaderRef)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </CustomUploader>
        <template v-slot:error>
          <div v-if="v$.exteriorPhotos.$errors.length === 1">
            <span>
              {{ v$.exteriorPhotos.$errors[0].$message }}
            </span>
          </div>
          <div v-else>
            <span v-for="error of v$.exteriorPhotos.$errors" :key="error.$uid">
              {{ error.$message }};
            </span>
          </div>
        </template>
      </q-field>
      <q-stepper-navigation>
        <q-btn
          :label="$t('formStepButtonNext')"
          type="submit"
          :loading="checkoutGeneralStore.isLoading"
          color="primary"
        />
        <q-btn
          flat
          @click="goBack"
          color="primary"
          :label="$t('formStepButtonPrev')"
          class="q-ml-sm"
        ></q-btn>
      </q-stepper-navigation>
    </q-form>
  </q-step>
</template>

<script>
import {
  defineComponent,
  inject,
  computed,
  ref,
  watch,
  onMounted,
  unref,
  nextTick,
} from "vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import { event } from "vue-gtag";
import {
  required as requiredOrig,
  requiredIf as requiredIfOrig,
  between as betweenOrig,
} from "@vuelidate/validators";
import { createI18nMessage } from "@vuelidate/validators";
import CustomUploader from "components/uploader/custom-file-uploader.js";
import { useQuasar, format } from "quasar";
const { humanStorageSize } = format;

export default defineComponent({
  name: "FormStep",
  components: { CustomUploader },
  setup() {
    const appStore = inject("appStore");
    const checkoutFormStore = inject("checkoutFormStore");
    const checkoutGeneralStore = inject("checkoutGeneralStore");
    const process = inject("process");
    const api = inject("api");
    const apiBaseUrl = inject("apiBaseUrl");

    const $q = useQuasar();
    const goBack = () => {
      if (appStore.isAuthorized || appStore.isAuthorizedInitial) {
        checkoutGeneralStore.step = 1;
        event("form-step-go-back-1");
      } else {
        checkoutGeneralStore.step = 2;
        event("form-step-go-back-2");
      }
    };

    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    const interiorUploaderRef = ref(null);
    let interiorUploader = null;
    const exteriorUploaderRef = ref(null);
    let exteriorUploader = null;
    onMounted(() => {
      if (interiorUploaderRef.value) {
        interiorUploader = interiorUploaderRef.value;
      }
      if (exteriorUploaderRef.value) {
        exteriorUploader = exteriorUploaderRef.value;
      }
    });

    const { t } = useI18n({});
    const withI18nMessage = createI18nMessage({ t });
    const required = withI18nMessage(requiredOrig);
    const requiredIf = withI18nMessage(requiredIfOrig, { withArguments: true });
    const between = withI18nMessage(betweenOrig, { withArguments: true });

    const totalMetersRules = {};
    if (checkoutFormStore.constraints.totalMeters.required) {
      totalMetersRules["required"] = required;
    }

    const livingMetersRules = {};
    if (checkoutFormStore.constraints.livingMeters.required) {
      livingMetersRules["required"] = required;
    }

    const kitchenMetersRules = {};
    if (checkoutFormStore.constraints.kitchenMeters.required) {
      kitchenMetersRules["required"] = required;
    }

    const areaSizeRules = {};
    if (checkoutFormStore.constraints.areaSize.required) {
      areaSizeRules["required"] = required;
    }

    const floorRules = {};
    if (checkoutFormStore.constraints.floor.required) {
      floorRules["required"] = required;
    }

    const floorsCountRules = {};
    if (checkoutFormStore.constraints.floorsCount.required) {
      floorsCountRules["required"] = required;
    }

    const roomsCountRules = {};
    if (checkoutFormStore.constraints.roomsCount.required) {
      roomsCountRules["required"] = required;
    }

    const wallTypeRules = {};
    if (checkoutFormStore.constraints.wallType.required) {
      wallTypeRules["required"] = required;
    }

    const interiorRenovationClassRules = {};
    if (checkoutFormStore.constraints.interiorRenovationClass.required) {
      interiorRenovationClassRules["required"] = required;
    }

    const interiorPhotosRules = {};
    const interiorNoRenovationTypeRules = {
      requiredIf: requiredIf(() => {
        return (
          checkoutFormStore.inputs.interiorRenovationClass ===
            "no_renovation" &&
          checkoutFormStore.constraints.interiorRenovationClass.required
        );
      }),
    };
    if (
      checkoutFormStore.constraints.totalMeters.min &&
      checkoutFormStore.constraints.totalMeters.min
    ) {
      totalMetersRules["totalMetersBetween"] = between(
        checkoutFormStore.constraints.totalMeters.min,
        checkoutFormStore.constraints.totalMeters.max
      );
    }
    if (
      checkoutFormStore.constraints.livingMeters.min &&
      checkoutFormStore.constraints.livingMeters.min
    ) {
      livingMetersRules["livingMetersBetween"] = between(
        checkoutFormStore.constraints.livingMeters.min,
        checkoutFormStore.constraints.livingMeters.max
      );
    }
    if (
      checkoutFormStore.constraints.kitchenMeters.min &&
      checkoutFormStore.constraints.kitchenMeters.min
    ) {
      kitchenMetersRules["kitchenMetersBetween"] = between(
        checkoutFormStore.constraints.kitchenMeters.min,
        checkoutFormStore.constraints.kitchenMeters.max
      );
    }
    if (
      checkoutFormStore.constraints.areaSize.min &&
      checkoutFormStore.constraints.areaSize.min
    ) {
      areaSizeRules["areaSizeBetween"] = between(
        checkoutFormStore.constraints.areaSize.min,
        checkoutFormStore.constraints.areaSize.max
      );
    }

    livingMetersRules["livingMetersSumKitchenValidator"] = withI18nMessage(
      (inputValue) => {
        let value = parseFloat(inputValue);
        let kitchenMeters = parseFloat(checkoutFormStore.inputs.kitchenMeters);
        if (isNaN(kitchenMeters)) {
          kitchenMeters = 0;
        }
        if (isNaN(value) || kitchenMeters <= 0) {
          return true;
        }
        return value > kitchenMeters;
      }
    );

    totalMetersRules["totalMetersSumLivingKitchenValidator"] = withI18nMessage(
      (inputValue) => {
        let value = parseFloat(inputValue);
        let livingMeters = parseFloat(checkoutFormStore.inputs.livingMeters);
        let kitchenMeters = parseFloat(checkoutFormStore.inputs.kitchenMeters);
        if (isNaN(livingMeters)) {
          livingMeters = 0;
        }
        if (isNaN(kitchenMeters)) {
          kitchenMeters = 0;
        }
        let sumLivingKitchen = kitchenMeters + livingMeters;
        if (isNaN(value) || sumLivingKitchen <= 0) {
          return true;
        }
        return value > sumLivingKitchen;
      }
    );

    floorRules["floorFloorsCountValidator"] = withI18nMessage((inputValue) => {
      let value =
        typeof inputValue == "object" && inputValue !== null
          ? inputValue.value
          : inputValue;
      let floorsCount =
        typeof checkoutFormStore.inputs.floorsCount == "object" &&
        checkoutFormStore.inputs.floorsCount !== null
          ? checkoutFormStore.inputs.floorsCount.value
          : checkoutFormStore.inputs.floorsCount;
      value = parseFloat(value);
      floorsCount = parseFloat(floorsCount);
      if (isNaN(value)) {
        return true;
      }
      if (isNaN(floorsCount)) {
        return true;
      }
      return value <= floorsCount;
    });

    interiorPhotosRules["interiorPhotosCountMin"] = withI18nMessage(
      () => {
        if (
          checkoutFormStore.inputs.interiorRenovationClass === "no_renovation"
        )
          return true;
        if (!checkoutFormStore.constraints.interiorPhotos.required) return true;

        return (
          checkoutFormStore.inputs.interiorPhotos.length >=
          checkoutFormStore.constraints.interiorPhotos.min
        );
      },
      {
        messageParams: () => {
          return {
            min: checkoutFormStore.constraints.interiorPhotos.min,
            max: checkoutFormStore.constraints.interiorPhotos.max,
          };
        },
      }
    );
    interiorPhotosRules["interiorPhotosCountMax"] = withI18nMessage(
      () => {
        if (
          checkoutFormStore.inputs.interiorRenovationClass === "no_renovation"
        )
          return true;
        if (!checkoutFormStore.constraints.interiorPhotos.required) return true;

        return (
          checkoutFormStore.inputs.interiorPhotos.length <=
          checkoutFormStore.constraints.interiorPhotos.max
        );
      },
      {
        messageParams: () => {
          return { max: checkoutFormStore.constraints.interiorPhotos.max };
        },
      }
    );

    const exteriorRenovationClassRules = {};
    if (checkoutFormStore.constraints.exteriorRenovationClass.required) {
      exteriorRenovationClassRules["required"] = required;
    }

    const exteriorPhotosRules = {};
    const exteriorNoRenovationTypeRules = {
      requiredIf: requiredIf(() => {
        return (
          checkoutFormStore.inputs.exteriorRenovationClass ===
            "facade_without_renovation" &&
          checkoutFormStore.constraints.exteriorRenovationClass.required
        );
      }),
    };

    exteriorPhotosRules["exteriorPhotosCountMin"] = withI18nMessage(
      () => {
        if (
          checkoutFormStore.inputs.exteriorRenovationClass ===
          "facade_without_renovation"
        )
          return true;
        if (!checkoutFormStore.constraints.exteriorPhotos.required) return true;

        return (
          checkoutFormStore.inputs.exteriorPhotos.length >=
          checkoutFormStore.constraints.exteriorPhotos.min
        );
      },
      {
        messageParams: () => {
          return {
            min: checkoutFormStore.constraints.exteriorPhotos.min,
            max: checkoutFormStore.constraints.exteriorPhotos.max,
          };
        },
      }
    );
    exteriorPhotosRules["exteriorPhotosCountMax"] = withI18nMessage(
      () => {
        if (
          checkoutFormStore.inputs.exteriorRenovationClass ===
          "facade_without_renovation"
        )
          return true;
        if (!checkoutFormStore.constraints.exteriorPhotos.required) return true;

        return (
          checkoutFormStore.inputs.exteriorPhotos.length <=
          checkoutFormStore.constraints.exteriorPhotos.max
        );
      },
      {
        messageParams: () => {
          return { max: checkoutFormStore.constraints.exteriorPhotos.max };
        },
      }
    );

    const rules = computed(() => ({
      totalMeters: totalMetersRules,
      livingMeters: livingMetersRules,
      kitchenMeters: kitchenMetersRules,
      areaSize: areaSizeRules,
      floor: floorRules,
      floorsCount: floorsCountRules,
      roomsCount: roomsCountRules,
      wallType: wallTypeRules,
      interiorRenovationClass: interiorRenovationClassRules,
      interiorNoRenovationType: interiorNoRenovationTypeRules,
      interiorPhotos: interiorPhotosRules,
      exteriorRenovationClass: exteriorRenovationClassRules,
      exteriorNoRenovationType: exteriorNoRenovationTypeRules,
      exteriorPhotos: exteriorPhotosRules,
    }));

    const $externalResults = ref({});
    const v$ = useVuelidate(rules, checkoutFormStore.inputs, {
      $autoDirty: true,
      $externalResults,
    });

    const interiorUploaderState = ref(null);
    const exteriorUploaderState = ref(null);

    const pushUploadedFile = (file, storage) => {
      storage.push({
        __img: { src: baseUrl + "/" + file.url },
        __progress: 1,
        __progressLabel: "100.00%",
        __sizeLabel: humanStorageSize(file.size),
        __status: "uploaded",
        __uploaded: file.size,
        name: file.name,
        size: file.size,
        type: file.mime,
        externalId: file.externalId,
      });
    };

    const interiorUploaderMounted = (helpers) => {
      checkoutFormStore.inputs.interiorPhotos.forEach((f) => {
        pushUploadedFile(f, helpers.files);
      });
      interiorUploaderState.value = helpers;
    };

    const exteriorUploaderMounted = (helpers) => {
      checkoutFormStore.inputs.exteriorPhotos.forEach((f) => {
        pushUploadedFile(f, helpers.files);
      });
      exteriorUploaderState.value = helpers;
    };

    watch(
      () => checkoutFormStore.inputs.interiorPhotos,
      async () => {
        if (!interiorUploaderState.value) return;

        checkoutFormStore.inputs.interiorPhotos.forEach(async (f) => {
          let hasMatch = false;
          await asyncForEach(interiorUploaderState.value.files, (f2) => {
            if (!"externalId" in f || !"externalId" in f2) {
              return;
            }
            if (f.externalId === f2.externalId) {
              hasMatch = true;
            }
          });

          if (!hasMatch) {
            pushUploadedFile(f, interiorUploaderState.value.files);
          }
        });
      },
      { deep: true }
    );

    watch(
      () => checkoutFormStore.inputs.exteriorPhotos,
      async () => {
        if (!exteriorUploaderState.value) return;

        checkoutFormStore.inputs.exteriorPhotos.forEach(async (f) => {
          let hasMatch = false;
          await asyncForEach(exteriorUploaderState.value.files, (f2) => {
            if (!"externalId" in f || !"externalId" in f2) {
              return;
            }
            if (f.externalId === f2.externalId) {
              hasMatch = true;
            }
          });

          if (!hasMatch) {
            pushUploadedFile(f, exteriorUploaderState.value.files);
          }
        });
      },
      { deep: true }
    );

    const scrollToError = () => {
      nextTick(() => {
        let firstError = document.querySelector(".q-field--error");
        if (!firstError) return;

        let domRect = firstError.getBoundingClientRect();
        window.scrollTo(
          domRect.left + document.documentElement.scrollLeft,
          domRect.top + document.documentElement.scrollTop
        );
      });
    };

    const uploadUrlInterior =
      apiBaseUrl +
      "?path=checkout&action=file&task=upload&entity=interior_photos&mode=" +
      checkoutGeneralStore.mode;
    const uploadUrlExterior =
      apiBaseUrl +
      "?path=checkout&action=file&task=upload&entity=exterior_photos&mode=" +
      checkoutGeneralStore.mode;

    const sendRequest = async () => {
      v$.value.$clearExternalResults();
      checkoutFormStore.errors = [];
      if (interiorUploaderState.value) {
        if (interiorUploaderState.value.isUploading) {
          $q.notify({
            multiLine: true,
            type: "info",
            icon: "upload",
            message: t("formStepUploaderStateInteriorPhotosWait"),
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return;
        }
      }

      const checkSuccessUploadInteriorPhotos = async () => {
        if (
          !checkoutFormStore.constraints.interiorPhotos.show ||
          !checkoutFormStore.constraints.interiorPhotos.required
        )
          return true;
        if (
          checkoutFormStore.inputs.interiorRenovationClass === "no_renovation"
        )
          return true;

        if (!interiorUploaderState.value) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderAddInteriorPhotos", {
              min: checkoutFormStore.constraints.interiorPhotos.min,
              max: checkoutFormStore.constraints.interiorPhotos.max,
            }),
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return false;
        }

        let uploadedFilesCnt = 0;
        await asyncForEach(interiorUploaderState.value.files, function (file) {
          if (file.__status === "uploaded") uploadedFilesCnt++;
        });

        if (
          uploadedFilesCnt < checkoutFormStore.constraints.interiorPhotos.min
        ) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderMinimumInteriorPhotos", {
              uploadedFilesCnt: uploadedFilesCnt,
              min: checkoutFormStore.constraints.interiorPhotos.min,
              max: checkoutFormStore.constraints.interiorPhotos.max,
            }),
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return false;
        }

        return true;
      };

      const checkSuccessUploadExteriorPhotos = async () => {
        if (
          !checkoutFormStore.constraints.exteriorPhotos.show ||
          !checkoutFormStore.constraints.exteriorPhotos.required
        )
          return true;
        if (
          checkoutFormStore.inputs.exteriorRenovationClass ===
          "facade_without_renovation"
        )
          return true;

        if (!exteriorUploaderState.value) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderAddExteriorPhotos", {
              min: checkoutFormStore.constraints.exteriorPhotos.min,
              max: checkoutFormStore.constraints.exteriorPhotos.max,
            }),
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return false;
        }

        let uploadedFilesCnt = 0;
        await asyncForEach(exteriorUploaderState.value.files, function (file) {
          if (file.__status === "uploaded") uploadedFilesCnt++;
        });

        if (
          uploadedFilesCnt < checkoutFormStore.constraints.exteriorPhotos.min
        ) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderMinimumExteriorPhotos", {
              uploadedFilesCnt: uploadedFilesCnt,
              min: checkoutFormStore.constraints.exteriorPhotos.min,
              max: checkoutFormStore.constraints.exteriorPhotos.max,
            }),
            position: "center",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return false;
        }

        return true;
      };

      const result = await v$.value.$validate();
      if (!result) {
        scrollToError();
        return;
      }

      if (!(await checkSuccessUploadInteriorPhotos())) return;
      if (!(await checkSuccessUploadExteriorPhotos())) return;

      process(false, "stepper-mode")
        .then(() => {
          v$.value.$touch();
        })
        .finally(() => {
          scrollToError();
        });
    };

    watch(
      () => checkoutFormStore.fieldErrors,
      (newValue) => {
        $externalResults.value = newValue;
      },
      { deep: true }
    );
    watch(
      () => checkoutFormStore.inputs.totalMeters,
      () => {
        v$.value.totalMeters.$validate();
      }
    );
    watch(
      () => checkoutFormStore.inputs.livingMeters,
      () => {
        v$.value.livingMeters.$validate();
      }
    );
    watch(
      () => checkoutFormStore.inputs.kitchenMeters,
      () => {
        v$.value.kitchenMeters.$validate();
      }
    );
    watch(
      () => checkoutFormStore.inputs.areaSize,
      () => {
        v$.value.areaSize.$validate();
      }
    );
    watch(
      () => checkoutFormStore.inputs.floorsCount,
      () => {
        if (checkoutFormStore.inputs.floor) v$.value.floor.$validate();
      }
    );

    const interiorUploadedHandler = (info) => {
      if (!"files" in info) return;

      info["files"].forEach(function (file, index, fileArray) {
        let success = false;
        let error = "";
        try {
          let result = JSON.parse(file.xhr.response);
          let data = {
            error: "",
            uploaded: false,
            externalId: "",
          };
          if (Array.isArray(result.data)) {
            data = result.data[0];
          }

          if (data.error.length > 0 || !data.uploaded) {
            error = data.error;
          } else {
            success = true;
          }

          fileArray[index]["externalId"] = data.externalId || "";

          if (success) {
            checkoutFormStore.inputs.interiorPhotos.push(data);
          }
        } catch (e) {
          console.error(e);
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: t("formStepUploaderUnknownError"),
            position: "center",
            group: "photo-uploader-file",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          throw e
        }

        if (success) {
          let message = t("formStepUploaderPhotoUploaded", {
            fileName: file.name,
          });

          $q.notify({
            multiLine: true,
            type: "positive",
            badgeColor: "black",
            icon: "cloud_done",
            message: message,
            position: "center",
            group: "photo-uploader",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        } else {
          let message = t("formStepUploaderPhotoUploadError", {
            fileName: file.name,
            error: error,
          });
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: message,
            position: "bottom",
            group: "photo-uploader",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        }
      });
    };

    const exteriorUploadedHandler = (info) => {
      if (!"files" in info) return;

      info["files"].forEach(function (file, index, fileArray) {
        let success = false;
        let error = "";
        try {
          let result = JSON.parse(file.xhr.response);
          let data = {
            error: "",
            uploaded: false,
            externalId: "",
          };
          if (Array.isArray(result.data)) {
            data = result.data[0];
          }

          if (data.error.length > 0 || !data.uploaded) {
            success = false;
            error = data.error;
          } else {
            success = true;
          }

          fileArray[index]["externalId"] = data.externalId || "";

          if (success) {
            checkoutFormStore.inputs.exteriorPhotos.push(data);
          }
        } catch (e) {
          console.error(e);
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: t("formStepUploaderUnknownError"),
            position: "center",
            group: "photo-uploader-file",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          throw e;
        }

        if (success) {
          let message = t("formStepUploaderPhotoUploaded", {
            fileName: file.name,
          });

          $q.notify({
            multiLine: true,
            type: "info",
            icon: "cloud_done",
            message: message,
            position: "bottom",
            group: "photo-uploader",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        } else {
          let message = t("formStepUploaderPhotoUploadError", {
            fileName: file.name,
            error: error,
          });
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: message,
            position: "bottom",
            group: "photo-uploader",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        }
      });
    };

    const failedHandler = (info) => {
      if (!"files" in info) return;

      info["files"].forEach((file) => {
        let message = t("formStepUploaderPhotoUploadErrorGeneric");
        try {
          let result = JSON.parse(file.xhr.response);
          let errorMessage = result.data[0]["error"];
          if (errorMessage.length > 0 && file.name.length > 0) {
            message = t("formStepUploaderPhotoUploadError", {
              fileName: file.name,
              error: errorMessage,
            });
          } else if (result.errors.length > 0) {
            message += ` ${result.errors.join(";")}`;
          }
        } catch (e) {
          console.error(e);
          throw e;
        } finally {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: message,
            position: "bottom",
            group: "photo-uploader",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        }
      });
    };

    const interiorFailedHandler = (info) => {
      failedHandler(info);
    };

    const exteriorFailedHandler = (info) => {
      failedHandler(info);
    };

    const interiorRejectedHandler = (info) => {
      info.forEach((reject) => {
        let message = t("formStepUploaderPhotoUploadErrorNoError", {
          fileName: reject.file.name,
        });
        if (reject.failedPropValidation === "max-file-size")
          message += t("formStepUploaderMaxInteriorFileSizeError");
        else if (reject.failedPropValidation === "accept")
          message += t("formStepUploaderMaxInteriorFileTypeError");
        else if (reject.failedPropValidation === "duplicate")
          message += t("formStepUploaderMaxInteriorFileAlreadyUploadedError");
        else if (reject.failedPropValidation === "max-files")
          message += t("formStepUploaderMaxInteriorFileCountError", {
            max: checkoutFormStore.constraints.interiorPhotos.max,
          });
        else message += t("formStepUploaderUnknownError");

        $q.notify({
          multiLine: true,
          type: "negative",
          icon: "error",
          message: message,
          position: "center",
          group: "photo-uploader-file",
          timeout: 5000,
          actions: [{ icon: "close", color: "white" }],
        });
      });
    };

    const exteriorRejectedHandler = (info) => {
      info.forEach((reject) => {
        let message = t("formStepUploaderPhotoUploadErrorNoError", {
          fileName: reject.file.name,
        });
        if (reject.failedPropValidation === "max-file-size")
          message += t("formStepUploaderMaxExteriorFileSizeError");
        else if (reject.failedPropValidation === "accept")
          message += t("formStepUploaderMaxExteriorFileTypeError");
        else if (reject.failedPropValidation === "duplicate")
          message += t("formStepUploaderMaxExteriorFileAlreadyUploadedError");
        else if (reject.failedPropValidation === "max-files")
          message += t("formStepUploaderMaxExteriorFileCountError", {
            max: checkoutFormStore.constraints.exteriorPhotos.max,
          });
        else message += t("formStepUploaderUnknownError");

        $q.notify({
          multiLine: true,
          type: "negative",
          icon: "error",
          message: message,
          position: "center",
          group: "photo-uploader-file",
          timeout: 5000,
          actions: [{ icon: "close", color: "white" }],
        });
      });
    };

    const interiorRemoveFile = (file, ref) => {
      const deleteUrlApi =
        apiBaseUrl +
        "?path=checkout&action=file&task=delete&entity=interior_photos&mode=" +
        checkoutGeneralStore.mode;
      const removeApi = axios.create({
        baseURL: deleteUrlApi,
        withCredentials: true,
      });
      const baseApi = unref(api);
      file.isRemoveProcess = true;
      let success = false;
      baseApi
        .post(
          {
            externalId: file.externalId,
          },
          "checkout",
          false,
          removeApi
        )
        .then(function (response) {
          success = response.data.success;
        })
        .catch((e) => {
          console.error(e);
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: t("formStepUploaderUnknownError"),
            position: "center",
            group: "photo-uploader-file",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        })
        .finally(() => {
          if (success) {
            ref.removeFile(file);
            checkoutFormStore.inputs.interiorPhotos =
              checkoutFormStore.inputs.interiorPhotos.filter((existingFile) => {
                return existingFile.externalId !== file.externalId;
              });
          } else {
            let message = t("formStepUploaderPhotoRemoveError", {
              fileName: file.name,
            });
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "error",
              message: message,
              position: "center",
              group: "photo-uploader-file",
              timeout: 5000,
              actions: [{ icon: "close", color: "white" }],
            });
          }

          file.isRemoveProcess = false;
        });
    };

    const exteriorRemoveFile = (file, ref) => {
      const deleteUrlApi =
        apiBaseUrl +
        "?path=checkout&action=file&task=delete&entity=exterior_photos&mode=" +
        checkoutGeneralStore.mode;
      const removeApi = axios.create({
        baseURL: deleteUrlApi,
        withCredentials: true,
      });
      const baseApi = unref(api);
      file.isRemoveProcess = true;
      let success = false;
      baseApi
        .post(
          {
            externalId: file.externalId,
          },
          "checkout",
          false,
          removeApi
        )
        .then(function (response) {
          success = response.data.success;
        })
        .catch((e) => {
          console.error(e);
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "error",
            message: t("formStepUploaderUnknownError"),
            position: "center",
            group: "photo-uploader-file",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
        })
        .finally(() => {
          if (success) {
            ref.removeFile(file);
            checkoutFormStore.inputs.exteriorPhotos =
              checkoutFormStore.inputs.exteriorPhotos.filter((existingFile) => {
                return existingFile.externalId !== file.externalId;
              });
          } else {
            let message = t("formStepUploaderPhotoRemoveError", {
              fileName: file.name,
            });
            $q.notify({
              multiLine: true,
              type: "negative",
              icon: "error",
              message: message,
              position: "center",
              group: "photo-uploader-file",
              timeout: 5000,
              actions: [{ icon: "close", color: "white" }],
            });
          }

          file.isRemoveProcess = false;
        });
    };

    const fileStatusTranslations = (status) => {
      let message = t("formStepUploaderPhotoStatus_" + status);
      if (message === "formStepUploaderPhotoStatus_" + status) message = status;

      return message;
    };

    return {
      humanStorageSize,
      uploadUrlInterior,
      uploadUrlExterior,
      interiorUploaderState,
      interiorRemoveFile,
      interiorUploaderMounted,
      interiorUploadedHandler,
      interiorFailedHandler,
      interiorRejectedHandler,
      exteriorUploaderState,
      exteriorRemoveFile,
      exteriorUploaderMounted,
      exteriorUploadedHandler,
      exteriorFailedHandler,
      exteriorRejectedHandler,
      goBack,
      checkoutGeneralStore,
      checkoutFormStore,
      sendRequest,
      v$,
      interiorUploaderRef,
      exteriorUploaderRef,
      fileStatusTranslations,
      baseUrl: import.meta.env.VITE_APP_BASE_URL,
    };
  },
});
</script>
<style scoped>
.upload-file-failed {
  color: red !important;
}
</style>
