import qrcode from "qrcode";

export const qrGenerator = async (data: any) => {
  //this.qr = await qrcode.toDataURL("https://estarporahi.com/wp-content/uploads/2021/10/Mejores-Eventos-De-Osos-Maduros.jpg")
  //this.qr = await qrcode.toDataURL(segs)
  const qr = await qrcode.toDataURL(
    `{ "point_name":"${data.name_point}", "zone_id":"${data.id}", "name_zone":"${data.adress}" }`
  );
  return qr
};

export const sumDate = (date:string)=>{
  let array = date.split("-")
  const day = Number(array[2]) + 1 
  array[2] = day.toString()
  const cadena = array.toString()
  return cadena.replace(/,/g,"-")

}
