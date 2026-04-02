// PIX BRCode generator following BCB EMV standard
// Reference: https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

function crc16(str: string): string {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export interface PixConfig {
  /** PIX key (CPF, email, phone, or random key) */
  pixKey: string;
  /** Merchant name */
  merchantName: string;
  /** Merchant city */
  merchantCity: string;
}

export function generatePixBRCode(config: PixConfig, amount: number, txId?: string): string {
  const { pixKey, merchantName, merchantCity } = config;

  // Merchant Account Information (ID 26)
  const gui = tlv('00', 'br.gov.bcb.pix');
  const key = tlv('01', pixKey);
  const merchantAccount = tlv('26', gui + key);

  let payload = '';
  payload += tlv('00', '01');                           // Payload Format Indicator
  payload += merchantAccount;                            // Merchant Account
  payload += tlv('52', '0000');                          // Merchant Category Code
  payload += tlv('53', '986');                           // Transaction Currency (BRL)
  payload += tlv('54', amount.toFixed(2));               // Transaction Amount
  payload += tlv('58', 'BR');                            // Country Code
  payload += tlv('59', merchantName.slice(0, 25));       // Merchant Name (max 25)
  payload += tlv('60', merchantCity.slice(0, 15));       // Merchant City (max 15)

  // Additional Data (ID 62) - txId
  if (txId) {
    payload += tlv('62', tlv('05', txId.slice(0, 25)));
  }

  // CRC placeholder then calculate
  payload += '6304';
  const checksum = crc16(payload);
  payload += checksum;

  return payload;
}

// Default config - restaurant should update this
export const DEFAULT_PIX_CONFIG: PixConfig = {
  pixKey: 'CHAVE_PIX_AQUI',
  merchantName: 'The Gilded Archive',
  merchantCity: 'SAO PAULO',
};
