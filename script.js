// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// AOS init
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// Chart.js doughnut for tokenomics
const ctx = document.getElementById('tokenChart');
if (ctx) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Team & Founders (15.7%)',
        'Treasury / Ecosystem (26.5%)',
        'Presale / Seed (19.4%)',
        'Liquidity (9.8%)',
        'Community & Rewards (10.1%)',
        'Partnerships & Growth (18.5%)'
      ],
      datasets: [{
        data: [15.7, 26.5, 19.4, 9.8, 10.1, 18.5],
        backgroundColor: ['#f59e0b','#f97316','#10b981','#3b82f6','#8b5cf6','#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: { position: 'right' },
        tooltip: { enabled: true }
      },
      cutout: '60%',
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Wallet connect & network (Polygon Amoy Testnet)
async function addOrSwitchToPolygonAmoy() {
  const chainIdHex = '0x13882'; // 80002
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
  } catch (switchError) {
    // If the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainIdHex,
          chainName: 'Polygon Amoy Testnet',
          nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
          rpcUrls: ['https://rpc-amoy.polygon.technology'],
          blockExplorerUrls: ['https://www.oklink.com/amoy']
        }],
      });
    } else {
      throw switchError;
    }
  }
}

async function connectWalletFlow() {
  if (!window.ethereum) {
    window.open('https://metamask.io/download/', '_blank');
    return;
  }
  try {
    await addOrSwitchToPolygonAmoy();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    alert('Wallet terhubung: ' + account);
  } catch (err) {
    alert('Gagal connect wallet: ' + (err && err.message ? err.message : err));
  }
}

const btn = document.getElementById('connectWallet');
const btnM = document.getElementById('connectWalletMobile');
if (btn) btn.addEventListener('click', connectWalletFlow);
if (btnM) btnM.addEventListener('click', connectWalletFlow);
