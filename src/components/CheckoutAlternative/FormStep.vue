<template>
  <div class="q-pa-sm form-step-block-color">
    <q-chip
      text-color="white"
      color="indigo-7"
      size="md"
      square
      outline
      icon="apartment"
      class="text-subtitle2 form-chip-block-style"
    >
      Обов'язкові характеристики
    </q-chip>
    <q-form class="q-gutter-md">
      <q-list padding>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="star" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Обов'язкові для заповнення поля</q-item-label>
            <q-item-label caption>
              Без цих даних ми не зможемо оцінити нерухомість
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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

      <q-input
        v-if="checkoutFormStore.constraints.roomsCount.show"
        filled
        v-model="checkoutFormStore.inputs.roomsCount"
        lazy-rules
        step="any"
        :label="$t('formStepRoomsCountLabel')"
        :hint="$t('formStepRoomsCountHint')"
        :error="v$.roomsCount.$errors.length > 0"
        type="number"
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
      </q-input>

      <q-input
        v-if="checkoutFormStore.constraints.floor.show"
        filled
        v-model="checkoutFormStore.inputs.floor"
        lazy-rules
        step="any"
        :label="$t('formStepFloorLabel')"
        :hint="$t('formStepFloorHint')"
        :error="v$.floor.$errors.length > 0"
        type="number"
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
      </q-input>

      <q-input
        v-if="checkoutFormStore.constraints.floorsCount.show"
        filled
        v-model="checkoutFormStore.inputs.floorsCount"
        :label="$t('formStepFloorsCountLabel')"
        :hint="$t('formStepFloorsCountHint')"
        lazy-rules
        step="any"
        :error="v$.floorsCount.$errors.length > 0"
        type="number"
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
      </q-input>

      <div class="has-furniture">
        <q-field
            v-if="checkoutFormStore.constraints.hasFurniture.show"
            v-model="checkoutFormStore.inputs.hasFurniture"
            borderless
            rounded
            :bottom-slots="true"
            :error="v$.hasFurniture.$errors.length > 0"
            class="has-furniture-field"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="bed" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Наявність меблів</q-item-label>
                <q-item-label v-if="v$.hasFurniture.$errors.length > 0">
                  <div
                      class="field-section-error"
                      v-if="v$.hasFurniture.$errors.length === 1"
                  >
                    <span>
                      {{ v$.hasFurniture.$errors[0].$message }}
                    </span>
                  </div>
                  <div v-else>
                    <span
                        v-for="error of v$.hasFurniture.$errors"
                        :key="error.$uid"
                    >
                      {{ error.$message }};
                    </span>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <q-btn-toggle
              v-model="checkoutFormStore.inputs.hasFurniture"
              rounded
              no-caps
              dense
              toggle-color="primary"
              color="white"
              text-color="primary"
              :disable="
              checkoutFormStore.inputs.interiorRenovationClass === 'walls' ||
              checkoutFormStore.inputs.interiorRenovationClass === 'rough'
            "
              :options="hasFurnitureOptions"
          >
            <template v-slot:option1>
              <q-icon right name="chair" style="display: block; width: 100%" />
            </template>

            <template v-slot:option2>
              <q-icon name="power_input" style="display: block; width: 100%" />
            </template>
          </q-btn-toggle>
        </q-field>
      </div>

      <div class="interior-renovation-class">
        <q-field
          v-if="checkoutFormStore.constraints.interiorRenovationClass.show"
          :model-value="checkoutFormStore.inputs.interiorRenovationClass"
          borderless
          rounded
          :error="v$.interiorRenovationClass.$errors.length > 0"
          class="interior-renovation-class-field"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="bed" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Інтер'єр</q-item-label>
                <q-item-label
                  v-if="v$.interiorRenovationClass.$errors.length > 0"
                >
                  <div
                    class="field-section-error"
                    v-if="v$.interiorRenovationClass.$errors.length === 1"
                  >
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
                </q-item-label>
                <q-item-label caption
                  >Оберіть стан інтер'єру, який найбільш відповідає
                  об'єкту.</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-chip
                    class="flex question-tooltip"
                    icon-selected="remove_circle_outline"
                    v-model:selected="tooltips.interiorClass"
                    clickable
                    style="cursor: pointer"
                    outline
                    square
                    color="deep-purple-13"
                    text-color="white"
                    icon="question_mark"
                  >
                    <q-popup-proxy
                      @before-hide="tooltips.interiorClass = false"
                    >
                      <q-banner dense v-close-popup>
                        <div style="position: relative">
                          <q-icon
                            style="
                              z-index: 10;
                              cursor: pointer;
                              position: absolute;
                              right: 0;
                              top: 0;
                            "
                            flat
                            size="sm"
                            color="primary"
                            name="close"
                            @click="tooltips.interiorClass = false"
                          />
                        </div>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label
                                >Фото можно завантажити нижче</q-item-label
                              >
                              <q-item-label caption lines="3">
                                Опціонально завантажте фото інтер'єру. <br />Це
                                дозволить зробити оцінку максимально точно.
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-banner>
                    </q-popup-proxy>
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:control>
            <LabeledOptionGroup
              v-model="checkoutFormStore.inputs.interiorRenovationClass"
              :options="interiorRenovationClassOptions"
            ></LabeledOptionGroup>
          </template>
        </q-field>
      </div>

      <div class="interior-renovation-class">
        <q-field
          v-if="checkoutFormStore.constraints.exteriorRenovationClass.show"
          :model-value="checkoutFormStore.inputs.exteriorRenovationClass"
          borderless
          rounded
          :error="v$.exteriorRenovationClass.$errors.length > 0"
          class="interior-renovation-class-field"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="bed" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Екстер'єр</q-item-label>
                <q-item-label
                  v-if="v$.exteriorRenovationClass.$errors.length > 0"
                >
                  <div
                    class="field-section-error"
                    v-if="v$.exteriorRenovationClass.$errors.length === 1"
                  >
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
                </q-item-label>
                <q-item-label caption
                  >Оберіть стан екстер'єру, який найбільш відповідає
                  об'єкту.</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-chip
                    class="flex question-tooltip"
                    icon-selected="remove_circle_outline"
                    v-model:selected="tooltips.exteriorClass"
                    clickable
                    style="cursor: pointer"
                    outline
                    square
                    color="deep-purple-13"
                    text-color="white"
                    icon="question_mark"
                  >
                    <q-popup-proxy
                      @before-hide="tooltips.exteriorClass = false"
                    >
                      <q-banner dense v-close-popup>
                        <div style="position: relative">
                          <q-icon
                            style="
                              z-index: 10;
                              cursor: pointer;
                              position: absolute;
                              right: 0;
                              top: 0;
                            "
                            flat
                            size="sm"
                            color="primary"
                            name="close"
                            @click="tooltips.exteriorClass = false"
                          />
                        </div>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label
                                >Фото можно завантажити нижче</q-item-label
                              >
                              <q-item-label caption lines="3">
                                Опціонально завантажте фото екстер'єру. <br />Це
                                дозволить зробити оцінку максимально точно.
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-banner>
                    </q-popup-proxy>
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:control>
            <LabeledOptionGroup
              v-model="checkoutFormStore.inputs.exteriorRenovationClass"
              :options="exteriorRenovationClassOptions"
            ></LabeledOptionGroup>
          </template>
        </q-field>
      </div>

    </q-form>
  </div>
  <div class="q-pa-sm form-step-block-color">
    <q-chip
      text-color="white"
      color="indigo-7"
      size="md"
      square
      outline
      icon="apartment"
      class="text-subtitle2 form-chip-block-style"
    >
      Додаткові характеристики
    </q-chip>
    <q-form class="q-gutter-md">
      <q-list padding>
        <q-item>
          <q-item-section avatar>
            <q-icon color="primary" name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Рекомендовані для заповнення поля</q-item-label>
            <q-item-label caption>
              Заповнення цих полів підвищує точність оцінки
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
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

      <div class="wall-type">
        <q-field
          v-if="checkoutFormStore.constraints.wallType.show"
          :model-value="checkoutFormStore.inputs.wallType"
          borderless
          rounded
          class="wall-type-field"
          :error="v$.wallType.$errors.length > 0"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="house_siding" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Тип стіни</q-item-label>
                <q-item-label v-if="v$.wallType.$errors.length > 0">
                  <div
                    class="field-section-error"
                    v-if="v$.wallType.$errors.length === 1"
                  >
                    <span>
                      {{ v$.wallType.$errors[0].$message }}
                    </span>
                  </div>
                  <div v-else>
                    <span
                      v-for="error of v$.wallType.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }};
                    </span>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:control>
            <q-btn-toggle
              v-model="checkoutFormStore.inputs.wallType"
              toggle-color="primary"
              :options="checkoutFormStore.options.wallType"
              no-caps
              flat
              unelevated
              :no-wrap="false"
              :spread="false"
              :error="v$.wallType.$errors.length > 0"
            >
            </q-btn-toggle>
          </template>
        </q-field>
      </div>

      <div class="additional-options">
        <q-field borderless rounded class="additional-options-field">
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="list" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Особливості</q-item-label>
              </q-item-section>
            </q-item>
          </template>
          <template v-slot:control>
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
          </template>
        </q-field>
      </div>

      <div class="interior-photos">
        <q-field
          stack-label
          hide-bottom-space
          v-if="checkoutFormStore.constraints.interiorPhotos.show"
          v-model="checkoutFormStore.inputs.interiorPhotos"
          borderless
          rounded
          :hint="
            $t('formStepInteriorTypeHint', {
              min: checkoutFormStore.constraints.interiorPhotos.min,
              max: checkoutFormStore.constraints.interiorPhotos.max,
            })
          "
          :bottom-slots="true"
          :error="v$.interiorPhotos.$errors.length > 0"
          class="interior-photos-field"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="add_a_photo" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Фото інтер'єру</q-item-label>
                <q-item-label v-if="v$.interiorPhotos.$errors.length > 0">
                  <div
                    class="field-section-error"
                    v-if="v$.interiorPhotos.$errors.length === 1"
                  >
                    <span>
                      {{ v$.interiorPhotos.$errors[0].$message }}
                    </span>
                  </div>
                  <div v-else>
                    <span
                      v-for="error of v$.interiorPhotos.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }};
                    </span>
                  </div>
                </q-item-label>
                <q-item-label caption>
                  Якщо є фото інтер'єру — завантажте їх.
                </q-item-label>
                <q-item-label caption>
                  Це допоможе нам зробити оцінку максимально точною.
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-chip
                    class="flex question-tooltip"
                    icon-selected="remove_circle_outline"
                    v-model:selected="tooltips.interiorClass"
                    clickable
                    style="cursor: pointer"
                    outline
                    square
                    color="deep-purple-13"
                    text-color="white"
                    icon="question_mark"
                  >
                    <q-popup-proxy
                      @before-hide="tooltips.interiorClass = false"
                    >
                      <q-banner dense v-close-popup>
                        <div style="position: relative">
                          <q-icon
                            style="
                              z-index: 10;
                              cursor: pointer;
                              position: absolute;
                              right: 0;
                              top: 0;
                            "
                            flat
                            size="sm"
                            color="primary"
                            name="close"
                            @click="tooltips.interiorClass = false"
                          />
                        </div>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label
                                >Опціонально завантажте фото
                                інтер'єру.</q-item-label
                              >
                              <q-item-label caption lines="3">
                                Не обов'язково, але бажано. <br />Це дозволить
                                зробити оцінку максимально точно.
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-banner>
                    </q-popup-proxy>
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
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
                <q-icon name="photo_camera" style="margin-right: 15px" />
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
                <q-spinner
                  v-if="scope.isUploading"
                  class="q-uploader__spinner"
                />
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
              <span
                v-for="error of v$.interiorPhotos.$errors"
                :key="error.$uid"
              >
                {{ error.$message }};
              </span>
            </div>
          </template>
        </q-field>
      </div>
      <div class="interior-photos">
        <q-field
          stack-label
          hide-bottom-space
          v-if="checkoutFormStore.constraints.exteriorPhotos.show"
          v-model="checkoutFormStore.inputs.exteriorPhotos"
          borderless
          rounded
          :hint="
            $t('formStepExteriorTypeHint', {
              min: checkoutFormStore.constraints.exteriorPhotos.min,
              max: checkoutFormStore.constraints.exteriorPhotos.max,
            })
          "
          :bottom-slots="true"
          :error="v$.exteriorPhotos.$errors.length > 0"
          class="interior-photos-field"
          style="margin-top: 30px; margin-bottom: 20px"
        >
          <template v-slot:before>
            <q-item>
              <q-item-section side top>
                <q-item-label caption>
                  <q-icon name="add_a_photo" size="md" />
                </q-item-label>
              </q-item-section>

              <q-item-section>
                <q-item-label>Фото екстер'єру</q-item-label>
                <q-item-label v-if="v$.exteriorPhotos.$errors.length > 0">
                  <div
                    class="field-section-error"
                    v-if="v$.exteriorPhotos.$errors.length === 1"
                  >
                    <span>
                      {{ v$.exteriorPhotos.$errors[0].$message }}
                    </span>
                  </div>
                  <div v-else>
                    <span
                      v-for="error of v$.exteriorPhotos.$errors"
                      :key="error.$uid"
                    >
                      {{ error.$message }};
                    </span>
                  </div>
                </q-item-label>
                <q-item-label caption>
                  Якщо є фото екстер'єру будинку — завантажте їх.
                </q-item-label>
                <q-item-label caption>
                  Це допоможе нам зробити оцінку максимально точною.
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <q-chip
                    class="flex question-tooltip"
                    icon-selected="remove_circle_outline"
                    v-model:selected="tooltips.exteriorClass"
                    clickable
                    style="cursor: pointer"
                    outline
                    square
                    color="deep-purple-13"
                    text-color="white"
                    icon="question_mark"
                  >
                    <q-popup-proxy
                      @before-hide="tooltips.exteriorClass = false"
                    >
                      <q-banner dense v-close-popup>
                        <div style="position: relative">
                          <q-icon
                            style="
                              z-index: 10;
                              cursor: pointer;
                              position: absolute;
                              right: 0;
                              top: 0;
                            "
                            flat
                            size="sm"
                            color="primary"
                            name="close"
                            @click="tooltips.exteriorClass = false"
                          />
                        </div>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label
                                >Опціонально завантажте фото
                                екстер'єру.</q-item-label
                              >
                              <q-item-label caption lines="3">
                                Не обов'язково, але бажано. <br />Це дозволить
                                зробити оцінку максимально точно.
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-banner>
                    </q-popup-proxy>
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
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
                <q-spinner
                  v-if="scope.isUploading"
                  class="q-uploader__spinner"
                />
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
              <span
                v-for="error of v$.exteriorPhotos.$errors"
                :key="error.$uid"
              >
                {{ error.$message }};
              </span>
            </div>
          </template>
        </q-field>
      </div>
    </q-form>
  </div>
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
  reactive,
  nextTick,
} from "vue";
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { useI18n } from "vue-i18n";
import {
  required as requiredOrig,
  requiredIf as requiredIfOrig,
  between as betweenOrig,
} from "@vuelidate/validators";
import { createI18nMessage } from "@vuelidate/validators";
import CustomUploader from "components/uploader/custom-file-uploader.js";
import LabeledOptionGroup from "components/CheckoutAlternative/Form/LabeledOptionGroup.vue";
import { useQuasar, format } from "quasar";
const { humanStorageSize } = format;

export default defineComponent({
  name: "FormStep",
  components: { CustomUploader, LabeledOptionGroup },
  setup() {
    const checkoutFormStore = inject("checkoutFormStore");
    const checkoutGeneralStore = inject("checkoutGeneralStore");
    const api = inject("api");
    const apiBaseUrl = inject("apiBaseUrl");
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const $q = useQuasar();

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

    const exteriorRenovationClassRules = {};
    if (checkoutFormStore.constraints.exteriorRenovationClass.required) {
      exteriorRenovationClassRules["required"] = required;
    }

    const interiorPhotosRules = {};
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

    // livingMetersRules["livingMetersSumKitchenValidator"] = withI18nMessage(
    //   (inputValue) => {
    //     return true;
    //     let value = parseFloat(inputValue);
    //     let kitchenMeters = parseFloat(checkoutFormStore.inputs.kitchenMeters);
    //     if (isNaN(kitchenMeters)) {
    //       kitchenMeters = 0;
    //     }
    //     if (isNaN(value) || kitchenMeters <= 0) {
    //       return true;
    //     }
    //     return value > kitchenMeters;
    //   }
    // );
    //
    // totalMetersRules["totalMetersSumLivingKitchenValidator"] = withI18nMessage(
    //   (inputValue) => {
    //     return true;
    //     let value = parseFloat(inputValue);
    //     let livingMeters = parseFloat(checkoutFormStore.inputs.livingMeters);
    //     let kitchenMeters = parseFloat(checkoutFormStore.inputs.kitchenMeters);
    //     if (isNaN(livingMeters)) {
    //       livingMeters = 0;
    //     }
    //     if (isNaN(kitchenMeters)) {
    //       kitchenMeters = 0;
    //     }
    //     let sumLivingKitchen = kitchenMeters + livingMeters;
    //     if (isNaN(value) || sumLivingKitchen <= 0) {
    //       return true;
    //     }
    //     return value > sumLivingKitchen;
    //   }
    // );

    if (
      checkoutFormStore.constraints.floorsCount.min &&
      checkoutFormStore.constraints.floorsCount.max
    ) {
      floorsCountRules["floorsCountBetween"] = between(
        checkoutFormStore.constraints.floorsCount.min,
        checkoutFormStore.constraints.floorsCount.max
      );
    }

    if (
      checkoutFormStore.constraints.floor.min &&
      checkoutFormStore.constraints.floor.max
    ) {
      floorRules["floorBetween"] = between(
        checkoutFormStore.constraints.floor.min,
        checkoutFormStore.constraints.floor.max
      );
    }

    // floorRules["floorFloorsCountValidator"] = withI18nMessage((inputValue) => {
    //   let value = parseInt(inputValue);
    //   let floorsCount = parseInt(checkoutFormStore.inputs.floorsCount);
    //
    //   if (isNaN(value)) {
    //     return true;
    //   }
    //   if (isNaN(floorsCount)) {
    //     return true;
    //   }
    //   return value <= floorsCount;
    // });

    if (
      checkoutFormStore.constraints.roomsCount.min &&
      checkoutFormStore.constraints.roomsCount.max
    ) {
      roomsCountRules["roomsCountBetween"] = between(
        checkoutFormStore.constraints.roomsCount.min,
        checkoutFormStore.constraints.roomsCount.max
      );
    }

    const hasFurnitureRules = {};
    if (checkoutFormStore.constraints.hasFurniture.required) {
      hasFurnitureRules["required"] = required;
    }

    interiorPhotosRules["interiorPhotosCountMin"] = withI18nMessage(
      () => {
        if (
          !checkoutFormStore.inputs.interiorPhotos ||
          !checkoutFormStore.inputs.interiorPhotos.length
        ) {
          return true;
        }

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
          !checkoutFormStore.inputs.interiorPhotos ||
          !checkoutFormStore.inputs.interiorPhotos.length
        ) {
          return true;
        }

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

    const exteriorPhotosRules = {};
    exteriorPhotosRules["exteriorPhotosCountMin"] = withI18nMessage(
      () => {
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
      hasFurniture: hasFurnitureRules,
      interiorRenovationClass: interiorRenovationClassRules,
      exteriorRenovationClass: exteriorRenovationClassRules,
      interiorPhotos: interiorPhotosRules,
      exteriorPhotos: exteriorPhotosRules,
    }));

    const externalResults$ = ref({});
    const v$ = useVuelidate(rules, checkoutFormStore.inputs, {
      $autoDirty: true,
      $externalResults: externalResults$,
      $stopPropagation: true,
      $scope: false,
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

    const uploadUrlInterior =
      apiBaseUrl +
      "?path=checkout&action=file&task=upload&entity=interior_photos&mode=" +
      checkoutGeneralStore.mode;
    const uploadUrlExterior =
      apiBaseUrl +
      "?path=checkout&action=file&task=upload&entity=exterior_photos&mode=" +
      checkoutGeneralStore.mode;

    const validate = async () => {
      v$.value.$clearExternalResults();
      externalResults$.value = {};
      checkoutFormStore.errors = [];
      if (interiorUploaderState.value) {
        if (interiorUploaderState.value.isUploading) {
          $q.notify({
            multiLine: true,
            type: "info",
            icon: "upload",
            message: t("formStepUploaderStateInteriorPhotosWait"),
            position: "bottom",
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
        ) {
          return true;
        }

        if (
          !checkoutFormStore.inputs.interiorPhotos ||
          !checkoutFormStore.inputs.interiorPhotos.length
        ) {
          return true;
        }

        if (!interiorUploaderState.value) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderAddInteriorPhotos", {
              min: checkoutFormStore.constraints.interiorPhotos.min,
              max: checkoutFormStore.constraints.interiorPhotos.max,
            }),
            position: "bottom",
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
            position: "bottom",
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
        ) {
          return true;
        }

        if (
          !checkoutFormStore.inputs.exteriorPhotos ||
          !checkoutFormStore.inputs.exteriorPhotos.length
        ) {
          return true;
        }

        if (!exteriorUploaderState.value) {
          $q.notify({
            multiLine: true,
            type: "negative",
            icon: "upload",
            message: t("formStepUploaderAddExteriorPhotos", {
              min: checkoutFormStore.constraints.exteriorPhotos.min,
              max: checkoutFormStore.constraints.exteriorPhotos.max,
            }),
            position: "bottom",
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
            position: "bottom",
            timeout: 5000,
            actions: [{ icon: "close", color: "white" }],
          });
          return false;
        }

        return true;
      };

      if (!(await checkSuccessUploadInteriorPhotos())) {
        // return false;
      }

      if (!(await checkSuccessUploadExteriorPhotos())) {
        // return false;
      }

      return await v$.value.$validate();
    };

    watch(
      () => checkoutFormStore.fieldErrors,
      (newValue) => {
        externalResults$.value = newValue;
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

    watch(
      () => checkoutFormStore.inputs.interiorRenovationClass,
      () => {
        if (
          checkoutFormStore.inputs.interiorRenovationClass === "rough" ||
          checkoutFormStore.inputs.interiorRenovationClass === "walls"
        ) {
          checkoutFormStore.inputs.hasFurniture = "no_furniture";
        }
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
            position: "bottom",
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
            type: "positive",
            badgeColor: "black",
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
            position: "bottom",
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
          position: "bottom",
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
          position: "bottom",
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
            position: "bottom",
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
              position: "bottom",
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
            position: "bottom",
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
              position: "bottom",
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

    const tooltips = reactive({
      interiorClass: false,
      interiorPhotos: false,
      exteriorClass: false,
      exteriorPhotos: false,
    });

    const hasFurnitureOptions = computed(() => {
      if (checkoutFormStore.options.hasFurniture !== "undefined") {
        let counter = 0;
        return checkoutFormStore.options.hasFurniture.map((item) => {
          counter++;
          return {
            label: item.label,
            value: item.value,
            slot: "option" + String(counter),
          };
        });
      }
      return [];
    });

    const interiorRenovationClassOptionsAll = [
      {
        label: "Елітний",
        value: "elite",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/elite/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/elite/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/elite/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/elite/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Дизайнерський",
        value: "business",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/business/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/business/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/business/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/business/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Евро",
        value: "comfort",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/comfort/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/comfort/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/comfort/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/comfort/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Косметичний",
        value: "standard",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/standard/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/standard/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/standard/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/standard/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Задовільний",
        value: "econom",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/econom/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/econom/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/econom/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/econom/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "В процесі ремонту",
        value: "in-progress",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/in-process/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/in-process/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/in-process/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/in-process/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Чорнова штукатурка",
        value: "rough",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/rough/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/rough/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/rough/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/rough/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Без оздоблення",
        value: "walls",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/walls/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/walls/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/walls/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/interior-class-examples/walls/4.jpg",
            index: 4,
          },
        ],
      },
    ];

    const interiorRenovationClassOptions =
      interiorRenovationClassOptionsAll.filter((item) => {
        if (["flat_sale", "house_sale"].includes(checkoutGeneralStore.mode)) {
          return true;
        }

        if (["flat_rent", "house_rent"].includes(checkoutGeneralStore.mode)) {
          if (["rough", "walls", "in-progress"].includes(item.value)) {
            return false;
          }
        }

        return true;
      });

    const exteriorRenovationClassOptions = [
      {
        label: "Новий",
        value: "new_exterior",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/new/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/new/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/new/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/new/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Задовільний",
        value: "used_exterior",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/used/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/used/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/used/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/used/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Потребує оновлення",
        value: "old_exterior",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/old/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/old/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/old/2.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/old/2.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Чорнова штукатурка",
        value: "rough_exterior",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/rough/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/rough/2.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/rough/3.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/rough/4.jpg",
            index: 4,
          },
        ],
      },
      {
        label: "Без оздоблення",
        value: "walls_exterior",
        sliderRef: ref(1),
        images: [
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/walls/1.jpg",
            index: 1,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/walls/1.jpg",
            index: 2,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/walls/1.jpg",
            index: 3,
          },
          {
            src:
              window.BX.message("SITE_DIR") +
              "local/templates/estimate.realestate/img/exterior-class-examples/walls/1.jpg",
            index: 4,
          },
        ],
      },
    ];

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
      checkoutGeneralStore,
      checkoutFormStore,
      validate,
      v$,
      interiorUploaderRef,
      exteriorUploaderRef,
      fileStatusTranslations,
      externalResults$,
      tooltips,
      hasFurnitureOptions,
      interiorRenovationClassOptions,
      exteriorRenovationClassOptions,
    };
  },
});
</script>
<style scoped>
.upload-file-failed {
  color: red !important;
}
</style>
<style lang="scss">
.form-step-block-color {
  border-radius: 10px;
  border: 1px solid $indigo-7;
  padding-top: 20px;
  position: relative;
  margin-top: 35px;
}
.form-chip-block-style {
  position: absolute;
  top: -20px;
  left: 10px;
  background-color: #fff !important;
}
.interior-photos {
  padding: 8px 16px;
}
.interior-renovation-class .q-field__marginal,
.interior-photos .q-field__marginal {
  height: auto !important;
}
.interior-renovation-class label.q-field,
.interior-photos label.q-field,
.additional-options label.q-field {
  flex-direction: column;
}
.interior-renovation-class .q-field--error .q-field__before,
.interior-renovation-class .q-field--error .q-radio__inner,
.wall-type .q-field--error .q-field__before,
.has-furniture .q-field--error .q-field__before {
  color: $negative !important;
}

.interior-renovation-class-field .q-field__before:first-child,
.wall-type-field .q-field__before:first-child,
.additional-options .q-field__before:first-child {
  display: inline-block;
  width: 100%;
  height: auto;
}

.interior-renovation-class-field .q-field__before:not(:first-child) {
  flex: 1;
}
.interior-renovation-class-field .question-tooltip {
  padding: 0;
}
.interior-renovation-class-field .question-tooltip .q-chip__icon {
  margin: 0;
  padding: 0;
}

.interior-photos-field .question-tooltip {
  padding: 0;
}
.interior-photos-field .question-tooltip .q-chip__icon {
  margin: 0;
  padding: 0;
}
.interior-photos-field .q-item.q-item-type {
  padding-left: 0;
}
.wall-type {
  max-width: 800px;
}
.wall-type label.q-field {
  flex-direction: column;
}
.wall-type-field {
  padding-bottom: 0;
}
.wall-type-field .q-btn-group {
  flex-wrap: wrap;
}
.wall-type-field .q-item.q-item-type {
  padding-left: 0;
}

.has-furniture {
  padding: 8px 16px;
  margin-top: 0;
}
.has-furniture label.q-field {
  flex-direction: column;
}
.has-furniture-field {
  padding-bottom: 0;
}
.has-furniture-field .q-btn-group {
  flex-wrap: wrap;
}
.has-furniture-field .q-item.q-item-type,
.interior-photos .q-item.q-item-type,
.wall-type .q-item.q-item-type,
.interior-renovation-class .q-item.q-item-type,
.additional-options .q-item.q-item-type {
  padding-left: 0;
}

.interior-renovation-class .q-field__marginal,
.interior-photos .q-field__marginal,
.wall-type .q-field__marginal,
.has-furniture .q-field__marginal,
.additional-options .q-field__marginal {
  font-size: 18px;
}
.field-section-error {
  font-size: 14px;
  color: $negative !important;
}
.interior-renovation-class .q-field__native.row {
  display: block !important;
}
@media (max-width: 479px) {
  .has-furniture,
  .interior-photos,
  .wall-type,
  .interior-renovation-class,
  .additional-options {
    padding: 8px 4px;
  }
}

@media (max-width: 380px) {
  .interior-photos-field .q-item.q-item-type {
    max-width: 250px;
  }
}
</style>
