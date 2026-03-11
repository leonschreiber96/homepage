class BasePaperComponent extends HTMLElement {
   static get observedAttributes() {
      return ["title", "authors", "venue", "date", "url", "pdf_url", "first_author", "type", "awards"];
   }

   connectedCallback() {
      this.innerHTML = this.template();
      this.update();
   }

   attributeChangedCallback() {
      if (!this.isConnected) return;
      if (!this.querySelector(".paper-title")) return;
      this.update();
   }

   get _attrs() {
      return {
         title: this.getAttribute("title"),
         authors: this.getAttribute("authors"),
         venue: this.getAttribute("venue"),
         date: this.getAttribute("date"),
         url: this.getAttribute("url"),
         pdfUrl: this.getAttribute("pdf_url"),
         firstAuthor: this.getAttribute("first_author"),
         type: this.getAttribute("type"),
         awards: this.getAttribute("awards"),
      };
   }

   template() {
      return "";
   }
   update() {}
}

// ─── Featured paper ───────────────────────────────────────────────────────────
// Card layout – visually prominent, appears in the grid.

class FeaturedPaperComponent extends BasePaperComponent {
   template() {
      return `
         <article class="paper-preview">
            <a class="paper-link" href="#">
               <h3 class="paper-title"></h3>
               <span class="paper-authors"></span>
               <div class="paper-meta">
                  <p class="paper-venue"></p>
                  <p class="paper-date"></p>
                  <div class="paper-flags">
                     <span class="flag flag-first-author" style="display:none">First author</span>
                     <span class="flag flag-paper-type"></span>
                  </div>
               </div>
               <div class="paper-awards"></div>
            </a>
         </article>
      `;
   }

   update() {
      const titleEl = this.querySelector(".paper-title");
      const authorsEl = this.querySelector(".paper-authors");
      const venueEl = this.querySelector(".paper-venue");
      const dateEl = this.querySelector(".paper-date");
      const anchorEl = this.querySelector(".paper-link");
      const paperTypeEl = this.querySelector(".flag-paper-type");
      const firstAuthorEl = this.querySelector(".flag-first-author");
      const awardsEl = this.querySelector(".paper-awards");

      if (!titleEl || !anchorEl) return;

      const { title, authors, venue, date, url, firstAuthor, type, awards } = this._attrs;

      if (![venue, date, url, authors, type, title].every((x) => x)) {
         console.log("FeaturedPaperComponent couldn't be created", this._attrs);
         this.remove();
         return;
      }

      titleEl.textContent = title;
      authorsEl.textContent = authors;
      venueEl.textContent = venue;
      dateEl.textContent = date;
      anchorEl.href = url;
      paperTypeEl.textContent = type;
      firstAuthorEl.style.display = JSON.parse(firstAuthor) ? "inline-block" : "none";

      awardsEl.innerHTML = "";
      if (awards) {
         JSON.parse(awards).forEach((award) => {
            const span = document.createElement("span");
            span.className = "paper-award";
            span.textContent = award;
            awardsEl.appendChild(span);
         });
      }
      awardsEl.style.display = awardsEl.children.length > 0 ? "" : "none";
   }
}

// ─── Compact paper ────────────────────────────────────────────────────────────
// Single-row list item – lower visual weight, used for non-featured publications.

class PaperComponent extends BasePaperComponent {
   template() {
      return `
         <li class="paper-list-item">
            <a class="paper-link" href="#">
               <span class="paper-flags">
                  <span class="flag flag-first-author" style="display:none">First author</span>
                  <span class="flag flag-paper-type"></span>
               </span>
               <span class="paper-title"></span>
               <span class="paper-meta">
                  <span class="paper-authors"></span>
                  <span class="paper-venue-date">
                     <span class="paper-venue"></span><span class="paper-date-sep"></span><span class="paper-date"></span>
                  </span>
               </span>
               <span class="paper-awards"></span>
            </a>
         </li>
      `;
   }

   update() {
      const titleEl = this.querySelector(".paper-title");
      const authorsEl = this.querySelector(".paper-authors");
      const venueEl = this.querySelector(".paper-venue");
      const dateSepEl = this.querySelector(".paper-date-sep");
      const dateEl = this.querySelector(".paper-date");
      const anchorEl = this.querySelector(".paper-link");
      const paperTypeEl = this.querySelector(".flag-paper-type");
      const firstAuthorEl = this.querySelector(".flag-first-author");
      const awardsEl = this.querySelector(".paper-awards");

      if (!titleEl || !anchorEl) return;

      const { title, authors, venue, date, url, firstAuthor, type, awards } = this._attrs;

      if (!title) {
         console.log("PaperComponent couldn't be created", this._attrs);
         this.remove();
         return;
      }

      titleEl.textContent = title;
      authorsEl.textContent = authors;
      venueEl.textContent = venue;
      dateEl.textContent = date;
      dateSepEl.textContent = venue && date ? ", " : "";
      anchorEl.href = url;
      paperTypeEl.textContent = type;
      firstAuthorEl.style.display = JSON.parse(firstAuthor) ? "inline-block" : "none";

      if (awardsEl) {
         awardsEl.innerHTML = "";
         if (awards) {
            JSON.parse(awards).forEach((award) => {
               const span = document.createElement("span");
               span.className = "paper-award";
               span.textContent = award;
               awardsEl.appendChild(span);
            });
         }
         awardsEl.style.display = awardsEl.children.length > 0 ? "" : "none";
      }
   }
}

customElements.define("x-featured-paper", FeaturedPaperComponent);
customElements.define("x-paper", PaperComponent);
