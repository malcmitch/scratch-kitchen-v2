import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Row,
  Column,
} from "@react-email/components";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type Props = {
  menuItems: MenuItem[];
  siteUrl?: string;
};

export default function WeeklyMenuEmail({
  menuItems,
  siteUrl = "https://thescratchkitchentx.com",
}: Props) {
  const groupedItems = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>
  );

  const categories = Object.keys(groupedItems).sort();

  return (
    <Html lang="en">
      <Head />
      <Body
        style={{
          backgroundColor: "#fdf6f0",
          fontFamily: "Georgia, serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#fdf6f0",
          }}
        >
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#1a1212",
              padding: "40px 32px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#c9a84c",
                fontSize: "42px",
                margin: "0 0 4px",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              The Scratch Kitchen
            </Text>
            <Text
              style={{
                color: "#8c6a5a",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: 0,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Chef Tikara · Richmond, TX
            </Text>
          </Section>

          {/* Week announcement */}
          <Section
            style={{
              backgroundColor: "#f0d6cc",
              padding: "28px 32px",
              textAlign: "center",
              borderBottom: "1px solid #e8b4a0",
            }}
          >
            <Text
              style={{
                color: "#3d2314",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 8px",
                fontFamily: "Georgia, serif",
              }}
            >
              This Week's Fresh Menu is Here! 🍽️
            </Text>
            <Text
              style={{
                color: "#6b3a24",
                fontSize: "14px",
                margin: 0,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Order by Friday at 8pm · Pickup Sunday · Delivery Mon–Tue
            </Text>
          </Section>

          {/* Menu items by category */}
          {categories.map((category) => (
            <Section key={category} style={{ padding: "24px 32px 0" }}>
              <Text
                style={{
                  color: "#c9a84c",
                  fontSize: "12px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderBottom: "1px solid #e8b4a0",
                  paddingBottom: "8px",
                  marginBottom: "16px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {category}
              </Text>

              {groupedItems[category].map((item) => (
                <Row
                  key={item.id}
                  style={{
                    marginBottom: "16px",
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    padding: "14px",
                    border: "1px solid #f0d6cc",
                  }}
                >
                  <Column style={{ paddingRight: "16px" }}>
                    <Text
                      style={{
                        color: "#1a1212",
                        fontSize: "15px",
                        fontWeight: "bold",
                        margin: "0 0 4px",
                        fontFamily: "Georgia, serif",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: "#8c6a5a",
                        fontSize: "12px",
                        margin: 0,
                        lineHeight: "1.5",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {item.description}
                    </Text>
                  </Column>
                  <Column
                    style={{
                      width: "70px",
                      textAlign: "right",
                      verticalAlign: "top",
                    }}
                  >
                    <Text
                      style={{
                        color: "#c9a84c",
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: 0,
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          ))}

          {/* CTA */}
          <Section
            style={{
              padding: "32px",
              textAlign: "center",
            }}
          >
            <Link
              href={`${siteUrl}/menu`}
              style={{
                backgroundColor: "#c9a84c",
                color: "#1a1212",
                padding: "14px 36px",
                borderRadius: "100px",
                fontWeight: "bold",
                fontSize: "14px",
                textDecoration: "none",
                display: "inline-block",
                fontFamily: "Arial, sans-serif",
              }}
            >
              View Full Menu & Order →
            </Link>

            <Text
              style={{
                color: "#8c6a5a",
                fontSize: "12px",
                marginTop: "16px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Or call/text Chef Tikara directly:{" "}
              <Link
                href="sms:+13463331292"
                style={{ color: "#c9a84c", textDecoration: "none" }}
              >
                346-333-1292
              </Link>
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e8b4a0", margin: "0 32px" }} />

          {/* Footer */}
          <Section
            style={{
              padding: "24px 32px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#8c6a5a",
                fontSize: "11px",
                margin: "0 0 8px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              The Scratch Kitchen · Richmond, TX · Fort Bend County
            </Text>
            <Text
              style={{
                color: "#c9a84c",
                fontSize: "11px",
                margin: 0,
                fontFamily: "Arial, sans-serif",
              }}
            >
              Menu drops every Wednesday · Orders close Friday at 8pm
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
