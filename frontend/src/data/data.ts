import text from "@/text/text";

const textData = {

navigation: [
    { label: `${text.page.components.navigation.learn}`, href: "learn" },
    { label: `${text.page.components.navigation.pricing}`, href: "pricing" },
    { label: `${text.page.components.navigation.about}`, href: "about" },
    { label: `${text.page.components.navigation.contact}`, href: "contact" },
    { label: `${text.page.components.navigation.cgu}`, href: "cgu"},
  ],
account: [
  { label: `${text.page.components.navigation.login}`, href: "login" },
  { label: `${text.page.components.navigation.signup}`, href: "signup" },
  ],
}

export default textData;