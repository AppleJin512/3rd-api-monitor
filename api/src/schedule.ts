// export let lastRequest = null;
// schedule.scheduleJob(CRON_SCHEDULE, async fireDate => {
//   LOGGER.info('executing royaltyReceiver at %s', fireDate.toISOString());
//   try {
//     await nftService.royaltyReceiverWithdraw();
//   } catch (err: any) {
//     LOGGER.error(
//       err,
//       'royaltyReceiverWithdraw failed, caused: %s',
//       err.message
//     );
//   }
//   LOGGER.info(
//     'executing royaltyReceiverWithdrawETH at %s',
//     fireDate.toISOString()
//   );
//   try {
//     await nftService.royaltyReceiverWithdrawETH();
//   } catch (err: any) {
//     LOGGER.error(
//       err,
//       'royaltyReceiverWithdrawETH failed, caused: %s',
//       err.message
//     );
//   }
// });
