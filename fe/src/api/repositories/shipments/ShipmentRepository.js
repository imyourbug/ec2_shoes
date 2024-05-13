import { getAxios } from '@/api/repositories/Repository';

const baseDomain = process.env.VUE_APP_DOMAIN_URL;
const baseUrl = `${baseDomain}/api/shipments`;

export default {
  getAllShipments() {
    return getAxios().get(`${baseUrl}/list`);
  },
  getDetailShipment(shipment_id) {
    return getAxios().get(`${baseUrl}/detail/${shipment_id}`);
  },
  create(shipment) {
    return getAxios().post(`${baseUrl}/create`, {
      name: shipment.name,
      fee: shipment.fee,
    });
  },
  remove(shipment_id) {
    return getAxios().delete(`${baseUrl}/delete`, {
      data: { id: shipment_id },
    });
  },
  edit(shipment) {
    return getAxios().put(`${baseUrl}/update`, {
      id: shipment.id,
      name: shipment.name,
      fee: shipment.fee,
    });
  },
};
