import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import "../../../css/help.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ExpandMore } from "@mui/icons-material";
import Marginer from "../../components/marginer";
import { Textarea } from "@mui/joy";

export function HelpPage() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const faq = [
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer: "To'lovni Click, Payme ilovalar orqali amalga oshira olasiz!",
    },
    {
      question: "Buyurtmalar qancha vaqtda yetkazib beriladi?",
      answer:
        "Bu manzilingiz va buyurtmagizga bogliq boladi. Odatda 30~50 minut oralig'ida!",
    },
    {
      question: "Sizning web sahifangiz xavsizmi foydalinishga?",
      answer:
        "Biz sizni ma'lumotlaringizni dasturchi sifatida xavsizligini ta'milaymiz!",
    },
    {
      question: "Karta ma'lumotlarini qayerga kiritaman?",
      answer:
        "Karta ma'lumotlarini mening sahifam o'ng tomonida mavjud bo'lgan jadvalga kiriting!",
    },
    {
      question: "Maqola yozishizni xohlayman?",
      answer:
        "Maqola yozish uchun mening sahifamdagi maqola yozish tugmasini bosish orqali yoza olasiz!",
    },
    {
      question: "Jonli muloqatga men ham qatnash olamanmi?",
      answer:
        "Ha albatt! Bunig uchun birinchi navbatda ro'yhatdan o'tingiz talab qilinadi!",
    },
  ];

  const rules = [
    "Web sahifadan to'loqonli ya'ni buyurtmalar qilish va jonli muloqotlardan foydalanish uchun birinchi navbatda ro'yhatdan o'tishingiz kerak!",
    "Buyurtmalaringizga to'lov amalga oshirilgandan so'ng bekor qilishni iloji yo'q. Shu sababli tolovlarni amalga oshirishdan oldin yaxshilab tekshirib oling!",
    "Jonli muloqatlarda behayo so'zlardan foydalanish qatiyan taqiqlanadi!",
    "Shaxsiy reklamalarni adminni ruhsatisiz tarqatish qatiyan man qilinadi!",
    "Maqolalaringiz odob doirasida bo'lishi kerak!",
    "Barcha harakatlaringiz adminlarimiz nazorati ostida, shu sababli talablarimizni xurmat qiling!",
    "Talab va taklirangizni bizga murojaat qiling!",
    "Har qanday shikoyat bolsa adminlarimizga bog'laning!",
    "Iltimos hurmatli foydalanuvchialr bir-biringizga hurmatda bo'ling!",
    "Web sahifammiz copyrightga ega!",
    "Bu web sahifammiz manzur bo'lgan bo'lsa yaqinlarigizga ulashib qo'ysangiz samimiy xursand bo'lamiz!",
  ];
  return (
    <div className="help_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Box
          sx={{
            width: "100%",
            typography: "body1",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab sx={{ color: "#fff" }} label="Qoidalar" value="1" />
                <Tab sx={{ color: "#fff" }} label="FAQ" value="2" />
                <Tab
                  sx={{ color: "#fff" }}
                  label="Adminga murojaat"
                  value="3"
                />
              </TabList>
            </Box>
            <Stack alignItems={"center"} sx={{ width: "100%", height: "auto" }}>
              <Box sx={{ mt: "30px" }}>
                <Marginer width="1272" height="1" bg="#fff" />
              </Box>
              <Stack className="help_main_container">
                <TabPanel value="1">
                  <Stack className="rule_box">
                    <Box className="rule_ele">
                      {rules.map((ele) => {
                        return (
                          <div>
                            <p>{ele}</p>
                            <Marginer width="100%" height="1" bg="#C4C4C4" />
                          </div>
                        );
                      })}
                    </Box>
                  </Stack>
                </TabPanel>
                <TabPanel value="2">
                  <Stack className="faq_container">
                    {faq.map((ele) => {
                      return (
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panella-content"
                            id="panella-header"
                          >
                            <Typography>{ele.question}</Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography>{ele.answer}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Stack>
                </TabPanel>
                <TabPanel value="3">
                  <Stack className="message_to_admin">
                    <Stack className="message_title">
                      <span>Adminga Xabar Qoldirish</span>
                      <p>
                        Assalomu alaykum! Adminga xabar qoldirish uchun pasdagi
                        formlarni to’ldiring!
                      </p>
                    </Stack>
                    <form action="#" method="POST" className="message_frame">
                      <div className="message_input_box">
                        <label htmlFor="">Ism</label>
                        <input
                          type="text"
                          name="mb_nick"
                          placeholder="ismingiz"
                        />
                      </div>
                      <div className="message_input_box">
                        <label htmlFor="">Elektron Manzil</label>
                        <input
                          type="text"
                          name="mb_email"
                          placeholder="email"
                        />
                      </div>
                      <div className="message_input_box">
                        <label htmlFor="">Xabar</label>
                        <textarea name="mb_msg" placeholder="xabar" />
                      </div>
                      <Box className="message_admin_btn">
                        <Button type={"submit"} variant="contained">
                          Jo’natish
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </TabPanel>
              </Stack>
            </Stack>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}
