type SlotSymbol = "🍒" | "🔔" | "⭐" | "💎";

class SlotMachine {
  symbols: SlotSymbol[] = ["🍒", "🔔", "⭐", "💎"];
  chips: number;
  multiplier: number;

  reset(): void {
  this.chips = 100;
  this.multiplier = 1;
  this.updateUI();
  this.showMessage("Neues Spiel gestartet!");
  const resetBtn = document.getElementById("resetButton");
  if (resetBtn) resetBtn.style.display = "none";
}


  constructor(startingChips: number) {
    this.chips = startingChips;
    this.multiplier = 1;
    this.updateUI();
  }

  spin(bet: number): void {
    if (bet > this.chips) {
      this.showMessage("Nicht genug Chips!");
      return;
    }

    this.chips -= bet;

    const reel1 = this.randomSymbol();
    const reel2 = this.randomSymbol();
    const reel3 = this.randomSymbol();

    // JEDE Walze separat ansprechen
    const reelElems = [
      document.getElementById("reel1"),
      document.getElementById("reel2"),
      document.getElementById("reel3")
    ];
    const reels = [reel1, reel2, reel3];

    reelElems.forEach((reelElem, i) => {
      if (reelElem) {
        reelElem.textContent = reels[i];

        // kleine Wackel-Animation
        reelElem.classList.add("spin-animate");
        setTimeout(() => reelElem.classList.remove("spin-animate"), 300);
      }
          if (this.chips <= 0) {
  this.showMessage("Game Over!");
  const resetBtn = document.getElementById("resetButton");
  if (resetBtn) resetBtn.style.display = "inline-block";
}
    });

    // Gewinnkontrolle
    if (reel1 === reel2 && reel2 === reel3) {
      const payout = bet * 5 * this.multiplier;
      this.chips += payout;
      this.showMessage(`Gewonnen! +${payout} Chips`);
    } else {
      this.showMessage("Leider verloren.");
    }

    this.updateUI();
  }

  buyUpgrade(cost: number): void {
    if (this.chips >= cost) {
      this.chips -= cost;
      this.multiplier += 1;
      this.showMessage(`Upgrade gekauft! Neuer Multiplikator: x${this.multiplier}`);
      this.updateUI();
    } else {
      this.showMessage("Nicht genug Chips für Upgrade!");
    }
  }

  private randomSymbol(): SlotSymbol {
    const index = Math.floor(Math.random() * this.symbols.length);
    return this.symbols[index] as SlotSymbol;
  }

  private updateUI(): void {
    const chipsSpan = document.getElementById("chips");
    if (chipsSpan) {
      chipsSpan.textContent = String(this.chips);
    }

    const multiplierSpan = document.getElementById("multiplier");
    if (multiplierSpan) {
      multiplierSpan.textContent = String(this.multiplier);
    }
  }

  private showMessage(msg: string): void {
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
      messageDiv.textContent = msg;
    }

  }
  
}

// DOM
const machine = new SlotMachine(1000);

const spinButton = document.getElementById("spinButton");
if (spinButton) {
  spinButton.addEventListener("click", () => {
    machine.spin(10);
  });
}
const resetButton = document.getElementById("resetButton");
if (resetButton) {
  resetButton.addEventListener("click", () => {
    machine.reset();
  });
}


const upgradeButton = document.getElementById("upgradeButton");
if (upgradeButton) {
  upgradeButton.addEventListener("click", () => {
    machine.buyUpgrade(50);
  });
}
