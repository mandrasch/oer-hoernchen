/*!
 * jQuery Internationalization library
 *
 * Copyright (C) 2012 Santhosh Thottingal
 *
 * jquery.i18n is dual licensed GPLv2 or later and MIT. You don't have to do anything special to
 * choose one license or the other and you don't have to notify anyone which license you are using.
 * You are free to use UniversalLanguageSelector in commercial projects as long as the copyright
 * header is left intact. See files GPL-LICENSE and MIT-LICENSE for details.
 *
 * @licence GNU General Public Licence 2.0 or later
 * @licence MIT License
 */
( function ($) {
    'use strict';

    $.i18n = $.i18n || {};
    $.extend($.i18n.fallbacks, {
        ab: ['ru'],
        ace: ['id'],
        aln: ['sq'],
        // Not so standard - als is supposed to be Tosk Albanian,
        // but in Wikipedia it's used for a Germanic language.
        als: ['gsw', 'de'],
        an: ['es'],
        anp: ['hi'],
        arn: ['es'],
        arz: ['ar'],
        av: ['ru'],
        ay: ['es'],
        ba: ['ru'],
        bar: ['de'],
        'bat-smg': ['sgs', 'lt'],
        bcc: ['fa'],
        'be-x-old': ['be-tarask'],
        bh: ['bho'],
        bjn: ['id'],
        bm: ['fr'],
        bpy: ['bn'],
        bqi: ['fa'],
        bug: ['id'],
        'cbk-zam': ['es'],
        ce: ['ru'],
        crh: ['crh-latn'],
        'crh-cyrl': ['ru'],
        csb: ['pl'],
        cv: ['ru'],
        'de-at': ['de'],
        'de-ch': ['de'],
        'de-formal': ['de'],
        dsb: ['de'],
        dtp: ['ms'],
        egl: ['it'],
        eml: ['it'],
        ff: ['fr'],
        fit: ['fi'],
        'fiu-vro': ['vro', 'et'],
        frc: ['fr'],
        frp: ['fr'],
        frr: ['de'],
        fur: ['it'],
        gag: ['tr'],
        gan: ['gan-hant', 'zh-hant', 'zh-hans'],
        'gan-hans': ['zh-hans'],
        'gan-hant': ['zh-hant', 'zh-hans'],
        gl: ['pt'],
        glk: ['fa'],
        gn: ['es'],
        gsw: ['de'],
        hif: ['hif-latn'],
        hsb: ['de'],
        ht: ['fr'],
        ii: ['zh-cn', 'zh-hans'],
        inh: ['ru'],
        iu: ['ike-cans'],
        jut: ['da'],
        jv: ['id'],
        kaa: ['kk-latn', 'kk-cyrl'],
        kbd: ['kbd-cyrl'],
        khw: ['ur'],
        kiu: ['tr'],
        kk: ['kk-cyrl'],
        'kk-arab': ['kk-cyrl'],
        'kk-latn': ['kk-cyrl'],
        'kk-cn': ['kk-arab', 'kk-cyrl'],
        'kk-kz': ['kk-cyrl'],
        'kk-tr': ['kk-latn', 'kk-cyrl'],
        kl: ['da'],
        'ko-kp': ['ko'],
        koi: ['ru'],
        krc: ['ru'],
        ks: ['ks-arab'],
        ksh: ['de'],
        ku: ['ku-latn'],
        'ku-arab': ['ckb'],
        kv: ['ru'],
        lad: ['es'],
        lb: ['de'],
        lbe: ['ru'],
        lez: ['ru'],
        li: ['nl'],
        lij: ['it'],
        liv: ['et'],
        lmo: ['it'],
        ln: ['fr'],
        ltg: ['lv'],
        lzz: ['tr'],
        mai: ['hi'],
        'map-bms': ['jv', 'id'],
        mg: ['fr'],
        mhr: ['ru'],
        min: ['id'],
        mo: ['ro'],
        mrj: ['ru'],
        mwl: ['pt'],
        myv: ['ru'],
        mzn: ['fa'],
        nah: ['es'],
        nap: ['it'],
        nds: ['de'],
        'nds-nl': ['nl'],
        'nl-informal': ['nl'],
        no: ['nb'],
        os: ['ru'],
        pcd: ['fr'],
        pdc: ['de'],
        pdt: ['de'],
        pfl: ['de'],
        pms: ['it'],
        pt: ['pt-br'],
        'pt-br': ['pt'],
        qu: ['es'],
        qug: ['qu', 'es'],
        rgn: ['it'],
        rmy: ['ro'],
        'roa-rup': ['rup'],
        rue: ['uk', 'ru'],
        ruq: ['ruq-latn', 'ro'],
        'ruq-cyrl': ['mk'],
        'ruq-latn': ['ro'],
        sa: ['hi'],
        sah: ['ru'],
        scn: ['it'],
        sg: ['fr'],
        sgs: ['lt'],
        sli: ['de'],
        sr: ['sr-ec'],
        srn: ['nl'],
        stq: ['de'],
        su: ['id'],
        szl: ['pl'],
        tcy: ['kn'],
        tg: ['tg-cyrl'],
        tt: ['tt-cyrl', 'ru'],
        'tt-cyrl': ['ru'],
        ty: ['fr'],
        udm: ['ru'],
        ug: ['ug-arab'],
        uk: ['ru'],
        vec: ['it'],
        vep: ['et'],
        vls: ['nl'],
        vmf: ['de'],
        vot: ['fi'],
        vro: ['et'],
        wa: ['fr'],
        wo: ['fr'],
        wuu: ['zh-hans'],
        xal: ['ru'],
        xmf: ['ka'],
        yi: ['he'],
        za: ['zh-hans'],
        zea: ['nl'],
        zh: ['zh-hans'],
        'zh-classical': ['lzh'],
        'zh-cn': ['zh-hans'],
        'zh-hant': ['zh-hans'],
        'zh-hk': ['zh-hant', 'zh-hans'],
        'zh-min-nan': ['nan'],
        'zh-mo': ['zh-hk', 'zh-hant', 'zh-hans'],
        'zh-my': ['zh-sg', 'zh-hans'],
        'zh-sg': ['zh-hans'],
        'zh-tw': ['zh-hant', 'zh-hans'],
        'zh-yue': ['yue']
    });
}(jQuery) );
