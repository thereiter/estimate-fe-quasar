<script setup lang="ts"></script>

<template>
  <header id="header" class="headroom <?php if($isDarkMode):?>is-dark-mode<?php endif;?>">
    <?php $APPLICATION->ShowPanel()?>
    <div class="startp-responsive-nav">
      <div class="container">
        <div class="startp-responsive-menu">
          <div class="logo">
            <a href="<?=SITE_DIR;?>">
              <picture>
                <source
                  srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200.webp"
                  type="image/webp"
                />
                <img
                  class="logo-black"
                  src="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200.png"
                  alt="logo"
                />
              </picture>
              <picture>
                <source
                  srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200_mob.webp"
                  type="image/webp"
                />
                <img
                  class="logo-black-mob"
                  src="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200_mob.png"
                  alt="logo"
                />
              </picture>
              <?php if($isDarkMode):?>
              <picture>
                <source
                  srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200.webp"
                  type="image/webp"
                />
                <img
                  class="logo-white"
                  src="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200.png"
                  alt="logo"
                />
              </picture>
              <picture>
                <source
                  srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200_mob.webp"
                  type="image/webp"
                />
                <img
                  class="logo-white-mob"
                  src="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200_mob.png"
                  alt="logo"
                />
              </picture>
              <?php endif;?>
            </a>

            <div class="startp-nav">
              <div class="container-fluid">
                <nav class="navbar navbar-expand-md navbar-light">
                  <div class="others-option">
                    <?php if($USER->IsAuthorized()):?>
                    <a
                      href="<?=$personalUrl;?>"
                      class="header-personal-url cabinet-header btn btn-light header-button<?php if($isActivePage($personalUrl)):?> active<?php endif;?>"
                    >
                      <i data-feather="user"></i>
                      <span class="header-personal-link-text link-text header-login">
                        <?php $login = $USER->GetEmail(); if(strlen($login) > 17) $login =
                        \TruncateText($login, 14); ?> <?=htmlspecialchars($login);?>
                      </span>
                    </a>
                    <?php else:?>
                    <a
                      href="<?=$authUrl;?>"
                      class="header-personal-url cabinet-header btn btn-light header-button<?php if($isActivePage($authUrl)):?> active<?php endif;?>"
                    >
                      <i data-feather="user"></i>
                      <span class="header-personal-link-text link-text">
                        <?=Loc::getMessage('HEADER_PERSONAL_LINK');?>
                      </span>
                    </a>
                    <?php endif;?>

                    <a
                      href="<?=SITE_DIR;?>estimate/checkout/flat-sale/"
                      class="btn btn-light header-button<?php if($isEstimateCheckoutPage):?> active<?php endif;?>"
                    >
                      <i data-feather="home"></i>
                      <span class="link-text"> <?=Loc::getMessage('HEADER_ESTIMATE_HREF');?> </span>
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="startp-nav">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-md navbar-light">
          <a class="navbar-brand" href="<?=SITE_DIR;?>">
            <picture>
              <source srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200.webp" type="image/webp" />
              <img
                class="logo-black"
                src="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200.png"
                alt="logo"
              />
            </picture>
            <picture>
              <source
                srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200_mob.webp"
                type="image/webp"
              />
              <img
                class="logo-black-mob"
                src="<?=SITE_TEMPLATE_PATH;?>/img/logo_black_200_mob.png"
                alt="logo"
              />
            </picture>
            <?php if($isDarkMode):?>
            <picture>
              <source srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200.webp" type="image/webp" />
              <img
                class="logo-white"
                src="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200.png"
                alt="logo"
              />
            </picture>
            <picture>
              <source
                srcset="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200_mob.webp"
                type="image/webp"
              />
              <img
                class="logo-white-mob"
                src="<?=SITE_TEMPLATE_PATH;?>/img/logo_white_200_mob.png"
                alt="logo"
              />
            </picture>
            <?php endif;?>
          </a>

          <?php $APPLICATION->IncludeComponent( "bitrix:menu", "header", Array( "ALLOW_MULTI_SELECT"
          => "Y", "CHILD_MENU_TYPE" => "left", "DELAY" => "N", "MAX_LEVEL" => "2",
          "MENU_CACHE_GET_VARS" => array(""), "MENU_CACHE_TIME" => "36000000", "MENU_CACHE_TYPE" =>
          "A", "MENU_CACHE_USE_GROUPS" => "Y", "ROOT_MENU_TYPE" => "top", "USE_EXT" => "N" ) );?>
          <div class="others-option">
            <?php if($USER->IsAuthorized()):?>
            <a
              href="<?=$personalUrl;?>"
              class="header-personal-url cabinet-header btn btn-light header-button<?php if($isActivePage($personalUrl)):?> active<?php endif;?>"
            >
              <i data-feather="user"></i>
              <span class="header-personal-link-text header-login">
                <?php $login = $USER->GetEmail(); if(strlen($login) > 17) $login =
                \TruncateText($login, 14); ?> <?=htmlspecialchars($login);?>
              </span>
            </a>
            <?php else:?>
            <a
              href="<?=$authUrl;?>"
              class="header-personal-url cabinet-header btn btn-light header-button<?php if($isActivePage($authUrl)):?> active<?php endif;?>"
            >
              <i data-feather="user"></i>
              <span class="header-personal-link-text">
                <?=Loc::getMessage('HEADER_PERSONAL_LINK');?>
              </span>
            </a>
            <?php endif;?>

            <a
              href="<?=SITE_DIR;?>estimate/checkout/"
              class="btn btn-light header-button<?php if($isEstimateCheckoutPage):?> active<?php endif;?>"
            >
              <i data-feather="home"></i>
              <?=Loc::getMessage('HEADER_ESTIMATE_HREF');?>
            </a>
          </div>

          <?php /*$APPLICATION->IncludeComponent( "estimate:template.language.switcher", "header",
          [] );*/?>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
