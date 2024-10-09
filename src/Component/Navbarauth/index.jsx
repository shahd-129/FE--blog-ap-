import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import React from 'react';

import { useTranslation } from 'react-i18next';

export default function Navauth() {
  const { t, i18n } = useTranslation()

  return (<>
    <AppBar sx={{ background: '#200930' }}>

      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
          {t("title")}
        </Typography>
        {i18n.language === "en"
          ? <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>
          : <Button onClick={() => i18n.changeLanguage('en')}>en</Button>
        }
      </Toolbar>
    </AppBar>
  </>
  )
}

