// src/components/InfoPage.js
import React from 'react';
import { Link } from 'react-router-dom';  // Importera Link för navigation
import './InfoPage.css';

const InfoPage = () => {
    return (
        <div className="info-container">
            <h1>Information och Policys</h1>

            <section>
                <h2>GDPR</h2>
                <p>
                    Vi värnar om din personliga integritet. Här kan du läsa mer om hur vi hanterar dina personuppgifter
                    enligt GDPR. Du har rätt att begära information om vilka uppgifter vi har om dig samt rätt att få dem raderade.
                </p>
            </section>

            <section>
                <h2>Sekretesspolicy</h2>
                <p>
                    Vi samlar endast in de uppgifter som är nödvändiga för att tillhandahålla våra tjänster.
                    Vi delar inte dina uppgifter med tredje part utan ditt godkännande.
                </p>
            </section>

            <section>
                <h2>Användarvillkor</h2>
                <p>
                    Genom att använda vår tjänst godkänner du våra användarvillkor. Missbruk av tjänsten kan leda till avstängning.
                </p>
            </section>

            <section>
                <h2>Cookies-policy</h2>
                <p>
                    Vi använder cookies för att förbättra din upplevelse. Du kan välja att acceptera eller neka cookies.
                </p>
            </section>

            {/* Länk tillbaka till startsidan */}
            <div className="back-to-home">
                <Link to="/">Tillbaka till startsidan</Link>
            </div>
        </div>
    );
};

export default InfoPage;
