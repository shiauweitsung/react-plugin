import React from 'react';
import i18n from '../../i18n/index';
import { useTranslation } from 'react-i18next';

export default function Translate() {
  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    console.log(lng);
    i18n.changeLanguage(lng);
  };
  return (
    <div className="translate-container">
      <h2>翻譯文字</h2>
      <h2>{t('Welcome to React')}</h2>
      <h4>切換語系：</h4>
      <button onClick={() => {
        changeLanguage('en');
      }}>
        切換英文
      </button>
      <button onClick={() => {
        changeLanguage('tw');
      }}>
        切換中文
      </button>
    </div>
  );
}
