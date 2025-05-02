import text from "@/text/text";

const textData = {

navigation: [
    { label: `${text.page.components.navigation.learn}`, href: "learn" },
    { label: `${text.page.components.navigation.pricing}`, href: "pricing" },
    { label: `${text.page.components.navigation.blog}`, href: "blog" },
    { label: `${text.page.components.navigation.about}`, href: "about" },
    { label: `${text.page.components.navigation.contact}`, href: "contact" },
  ],
account: [
  { label: `${text.page.components.navigation.login}`, href: "login" },
  { label: `${text.page.components.navigation.signup}`, href: "signup" },
  ],
  footer: [
    { label: `${text.page.components.navigation.cgu}`, href: "cgu" },
  ]
}

export default textData;